import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { loginApi, loginWithGoogleApi, logoutApi } from "~/api/auth.api";
import type { MutationConfig } from "~/lib/react-query";
import { ROUTES } from "~/constants/router";
import { ToastAndroid } from "react-native";
import { toString } from "lodash-es";

type UseLoginOptions = {
  config?: MutationConfig<typeof loginApi>;
};

export const useLogin = ({ config }: UseLoginOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: loginApi,
    onError: (error) => {
      ToastAndroid.show(
        toString(error?.response?.data.message),
        ToastAndroid.LONG
      );
    },
  });
};

type UseLogoutOptions = {
  config?: MutationConfig<typeof logoutApi>;
};

export const useLogout = ({ config }: UseLogoutOptions = {}) => {
  return useMutation({
    mutationFn: logoutApi,
    ...config,
  });
};

type UseGoogleLoginOptions = {
  config?: MutationConfig<typeof loginWithGoogleApi>;
};

export const useGoogleLogin = ({ config }: UseGoogleLoginOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: loginWithGoogleApi,
    onError: (error) => {
      ToastAndroid.show(
        toString(error?.response?.data.message),
        ToastAndroid.LONG
      );
    },
  });
};
