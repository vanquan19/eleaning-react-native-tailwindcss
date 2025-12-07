import { API_ENDPOINTS } from "~/constants/api";
import { http } from "~/lib/http";
import { LoginDTO } from "~/schema/auth.schema";
import type { Response } from "~/types/common.type";
import type { LoginResponse, LogoutResponse, Profile } from "~/types/auth.type";

export const loginApi = (data: LoginDTO) => {
  return http.post<LoginDTO, LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
};

export const activeAccountApi = (code: string) => {
  return http.post<null, Response<Profile>>(
    API_ENDPOINTS.AUTH.ACTIVE_ACCOUNT,
    null,
    {
      params: { code },
    }
  );
};

export const logoutApi = async () => {
  return http.get<Response<LogoutResponse>>(API_ENDPOINTS.AUTH.LOGOUT);
};

export const forgotPasswordApi = (email: string) => {
  return http.post<null, Response<null>>(
    API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
    null,
    {
      params: { email },
    }
  );
};

export const verifyResetCodeApi = ({
  code,
  email,
  newPassword,
  confirmPassword,
}: {
  code: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  return http.post<
    {
      code: string;
      email: string;
      newPassword: string;
      confirmPassword: string;
    },
    Response<null>
  >(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
    code,
    email,
    newPassword,
    confirmPassword,
  });
};

export const loginWithGoogleApi = (idToken: string) => {
  return http.post<{ idToken: string }, LoginResponse>(
    API_ENDPOINTS.AUTH.GOOGLE,
    { idToken }
  );
};
