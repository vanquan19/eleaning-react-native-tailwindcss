import { useForm } from "react-hook-form";
import * as React from "react";
import { LoginDTO, LoginSchema } from "~/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import i18n from "~/lib/i18n";
import { ROUTES } from "~/constants/router";
import { Text } from "react-native";
import { useLogin } from "~/hooks/queries/useAuthQuery";
import { ToastAndroid } from "react-native";
import { storageServices } from "~/utils/localStorageServices";
import { useUserProfile } from "~/hooks/queries/useUserQuery";
import authStore from "~/stores/auth.store";
import { router, useSegments } from "expo-router";
import { API_STATUS } from "~/constants/api";

const DEFAULT_VALUE = {
  email: "",
  password: "",
};

export function FormLogin() {
  const setAuth = authStore.use.setAuth();
  const segment = useSegments();

  const { refetch } = useUserProfile({
    config: {
      enabled: false,
    },
  });

  const form = useForm<LoginDTO>({
    defaultValues: DEFAULT_VALUE,
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });
  const { mutate: login } = useLogin({
    config: {
      onSuccess: async (data) => {
        if (data.success === false) {
          ToastAndroid.show(
            data?.message ?? "Tài khoản hoặc mật khẩu không chính xác!",
            ToastAndroid.LONG
          );
          return;
        }
        storageServices.setAccessToken(data.data?.accessToken ?? "");
        storageServices.setRefreshToken(data.data?.refreshToken ?? "");
        refetch().then((result) => {
          console.log("result", result);
          if (result.data?.data && result.data?.status === API_STATUS.SUCCESS) {
            const profile = result.data.data;

            setAuth({
              id: profile.id,
              email: profile.email,
              fullName: profile.fullName,
              avatar: profile.avatar,
              roles: profile.roles,
            });
            ToastAndroid.show("Đăng nhập thành công!", ToastAndroid.LONG);
            router.replace(ROUTES.HOME.path);
          }
        });
      },
    },
  });
  const onSubmit = (data: LoginDTO) => {
    login(data);
  };
  return (
    <Form {...form}>
      <Input
        control={form.control}
        placeholder={i18n.t("input.email")}
        name="email"
        error={form.formState.errors.email?.message}
      />
      <Input
        control={form.control}
        placeholder={i18n.t("input.password")}
        name="password"
        type="password"
        error={form.formState.errors.password?.message}
      />
      <Button onPress={form.handleSubmit(onSubmit)} className="mb-2">
        {i18n.t("buttons.login")}
      </Button>
      <Text
        onPress={() => router.push(ROUTES.FORGOT_PASSWORD.path as never)}
        className="mb-8 text-primary ml-auto"
      >
        {i18n.t("login.forgot-password")}
      </Text>
    </Form>
  );
}
