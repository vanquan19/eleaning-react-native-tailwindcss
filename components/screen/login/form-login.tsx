import { useForm } from "react-hook-form";
import * as React from "react";
import { LoginDTO, LoginSchema } from "~/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import i18n from "~/lib/i18n";
import { useRouter } from "expo-router";
import { ROUTES } from "~/constants/router";
import { Text } from "react-native";

const DEFAULT_VALUE = {
  email: "",
  password: "",
};

export function FormLogin() {
  const form = useForm<LoginDTO>({
    defaultValues: DEFAULT_VALUE,
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter();
  const onSubmit = (data: LoginDTO) => {
    console.log(data);
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
        error={form.formState.errors.password?.message}
      />
      <Button onPress={form.handleSubmit(onSubmit)} className="mb-2">
        {i18n.t("buttons.login")}
      </Button>
      <Text
        onPress={() => router.push(ROUTES.FORGOT_PASSWORD.path)}
        className="mb-8 text-primary ml-auto"
      >
        {i18n.t("login.forgot-password")}
      </Text>
    </Form>
  );
}
