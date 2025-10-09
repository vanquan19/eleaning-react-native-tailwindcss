import { useMutation } from "@tanstack/react-query";

import {
  activeAccountApi,
  forgotPasswordApi,
  verifyResetCodeApi,
} from "~/api/auth.api";

import { MutationConfig } from "~/lib/react-query";

type UseRegisterOptions = {
  config?: MutationConfig<typeof activeAccountApi>;
};
export const useVerifyAccount = ({ config }: UseRegisterOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: activeAccountApi,
  });
};

type UseAGetOTPOptions = {
  config?: MutationConfig<typeof forgotPasswordApi>;
};
export const useGetOTP = ({ config }: UseAGetOTPOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: forgotPasswordApi,
  });
};

type UseResetPasswordOptions = {
  config?: MutationConfig<typeof verifyResetCodeApi>;
};
export const useResetPassword = ({ config }: UseResetPasswordOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: verifyResetCodeApi,
  });
};
