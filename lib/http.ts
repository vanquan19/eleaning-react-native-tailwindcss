import axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios";
import { API_BASE_URL, API_ENDPOINTS, API_STATUS } from "~/constants/api";
import { storageServices } from "~/utils/localStorageServices";
import authStore from "~/stores/auth.store";
import type { Response } from "~/types/common.type";

const defaultConfig: AxiosRequestConfig = {
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: API_BASE_URL,
};

class HttpClient {
  private static axiosInstance: AxiosInstance = axios.create(defaultConfig);
  private static requests: ((token: string) => void)[] = [];
  private static isRefreshing = false;

  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  /** Request interceptor: attach token */
  private httpInterceptorsRequest() {
    HttpClient.axiosInstance.interceptors.request.use(async (config) => {
      const token = await storageServices.getAccessToken();
      if (token) {
        if (!config.headers)
          config.headers = {} as import("axios").AxiosRequestHeaders;
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  /** Refresh token using separate axios (avoid interceptor loop) */
  private getNewToken = async () => {
    const refreshToken = await storageServices.getRefreshToken();
    const refreshClient = axios.create({ baseURL: API_BASE_URL });
    const { data } = await refreshClient.post(API_ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    });

    await storageServices.setAccessToken(data.token);
    await storageServices.setRefreshToken(data.refreshToken);

    return data.token;
  };

  /** Response interceptor: handle 401 */
  private httpInterceptorsResponse() {
    HttpClient.axiosInstance.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        console.log("HTTP error", error);
        console.log("HTTP error response", error.response);
        console.log("HTTP error config", error.config);
        const { config, response } = error;

        if (response?.status === API_STATUS.UNAUTHORIZED) {
          if (!HttpClient.isRefreshing) {
            HttpClient.isRefreshing = true;
            try {
              const newToken = await this.getNewToken();
              this.onRefreshed(newToken);
            } catch (e) {
              this.onRefreshFailed(e);
              authStore.getState().clearAuth();
              throw e;
            } finally {
              HttpClient.isRefreshing = false;
            }
          }

          // queue request until token refreshed
          return new Promise((resolve) => {
            this.subscribeTokenRefresh((token) => {
              if (!config.headers) config.headers = {};
              config.headers.Authorization = `Bearer ${token}`;
              resolve(HttpClient.axiosInstance.request(config));
            });
          });
        }

        throw error;
      }
    );
  }

  /** Notify queued requests when token refreshed */
  private onRefreshed(token: string) {
    HttpClient.requests.forEach((cb) => cb(token));
    HttpClient.requests = [];
  }

  /** Notify queued requests when refresh fail */
  private onRefreshFailed(error: any) {
    HttpClient.requests.forEach((cb) => cb(""));
    HttpClient.requests = [];
  }

  /** Queue request waiting for refresh */
  private subscribeTokenRefresh(cb: (token: string) => void) {
    HttpClient.requests.push(cb);
  }

  /** Base request */
  public request<T>(
    method: Method,
    url: string,
    options?: Omit<AxiosRequestConfig, "method" | "url">
  ): Promise<T> {
    return HttpClient.axiosInstance.request({ method, url, ...options });
  }

  /** GET */
  public get<T>(
    url: string,
    options?: Omit<AxiosRequestConfig, "method" | "url">
  ) {
    return this.request<T>("get", url, options);
  }

  /** POST */
  public post<T, R>(
    url: string,
    data: T,
    options?: Omit<AxiosRequestConfig, "method" | "url">
  ): Promise<Response<R>> {
    return this.request<Response<R>>("post", url, { ...options, data });
  }

  public delete<T>(
    url: string,
    options?: Omit<AxiosRequestConfig, "method" | "url">
  ) {
    return this.request<T>("delete", url, options);
  }
}

export const http = new HttpClient();
