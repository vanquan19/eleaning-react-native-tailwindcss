import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ROUTES } from "@/constants/routes";
import { USER_PROFILE } from "@/hooks/queries/useAuthQuery";
import { queryClient } from "@/lib/react-query";
import createSelectors from "@/lib/zustand-selectors";
import { router } from "@/router/router";

export type TAuth = {
  id: string;
  email: string | undefined;
  name: string | undefined;
};

type AuthAction = {
  setAuth: (data: TAuth | undefined) => void;
  setIsInitialize: (data: "success" | "error" | "isLoading") => void;
  clearAuth: () => void;
};

type AuthState = {
  auth: TAuth | undefined;
  isInitialize: "success" | "error" | "isLoading";
};

const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      auth: undefined,
      isInitialize: "isLoading",
      setAuth: (user) => set((state) => ({ ...state, auth: user })),
      setIsInitialize: (data) =>
        set((state) => ({ ...state, isInitialize: data })),
      clearAuth: () => {
        localStorage.clear();
        set((state) => ({ ...state, auth: undefined }));
        queryClient.setQueryData([USER_PROFILE], null);
        router.navigate(ROUTES.AUTH.LOGIN);
      },
    }),
    {
      name: "auth_store",
    }
  )
);

export default createSelectors(useAuthStore);
