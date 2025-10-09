import { router } from "expo-router";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { queryClient } from "~/lib/react-query";
import createSelectors from "~/lib/zustand-selectors";
import { storageServices } from "~/utils/localStorageServices";
import { Role, StatusRequest } from "~/types/enum";
import { QUERIES_KEY } from "~/constants/queries-key";

export type TAuth = {
  id: string;
  email: string | undefined;
  fullName: string | undefined;
  avatar?: string | undefined;
  roles?: Role[] | undefined;
};

type AuthAction = {
  setAuth: (data: TAuth | undefined) => void;
  setIsInitialize: (data: StatusRequest) => void;
  clearAuth: () => Promise<void>;
};

type AuthState = {
  auth: TAuth | undefined;
  isInitialize: StatusRequest;
};

const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      auth: undefined,
      isInitialize: StatusRequest.Pending,
      setAuth: (user) => set((state) => ({ ...state, auth: user })),
      setIsInitialize: (data) =>
        set((state) => ({ ...state, isInitialize: data })),
      clearAuth: async () => {
        await storageServices.clearAuth();
        set((state) => ({ ...state, auth: undefined }));
        queryClient.setQueryData([QUERIES_KEY.USER.PROFILE], null);
      },
    }),
    {
      name: "auth_store",
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);

export default createSelectors(useAuthStore);
