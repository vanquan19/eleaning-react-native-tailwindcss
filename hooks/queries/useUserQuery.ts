import { useMutation, useQuery } from "@tanstack/react-query";
import { toString } from "lodash-es";
import { ToastAndroid } from "react-native";
import { getUserProfile, registerUser } from "~/api/user.api";
import { QUERIES_KEY } from "~/constants/queries-key";
import type { MutationConfig, QueryConfig } from "~/lib/react-query";
import type { Profile } from "~/types/auth.type";
import type { Response } from "~/types/common.type";

type UserProfileOptions = { config: QueryConfig<typeof getUserProfile> };

export const useUserProfile = ({ config }: UserProfileOptions) => {
  return useQuery<Response<Profile>, Error>({
    queryKey: [QUERIES_KEY.USER.PROFILE],
    queryFn: getUserProfile,
    ...config,
  });
};

type UseRegisterOptions = {
  config?: MutationConfig<typeof registerUser>;
};

export const useRegister = ({ config }: UseRegisterOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: registerUser,
    onError: (error) => {
      ToastAndroid.show(
        toString(error?.response?.data.message),
        ToastAndroid.LONG
      );
    },
  });
};
