import { useForm } from "react-hook-form";
import * as React from "react";
import {
  ForgotPasswordDTO,
  ForgotPasswordSchema,
  LoginDTO,
  LoginSchema,
} from "~/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import i18n from "~/lib/i18n";
import { useRouter } from "expo-router";
import { ROUTES } from "~/constants/router";

const DEFAULT_VALUE = {
  email: "",
};

export function FormForgotPassword() {
  const form = useForm<ForgotPasswordDTO>({
    defaultValues: DEFAULT_VALUE,
    mode: "onBlur",
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const router = useRouter();
  const onSubmit = (data: ForgotPasswordDTO) => {
    console.log(data);
    router.push({
      pathname: ROUTES.OTP_VERIFICATION.path,
      params: { id: data.email },
    });
  };
  return (
    <Form {...form}>
      <Input
        control={form.control}
        placeholder={i18n.t("input.email")}
        name="email"
        error={form.formState.errors.email?.message}
      />

      <Button onPress={form.handleSubmit(onSubmit)} className="mb-2">
        {i18n.t("buttons.send-code")}
      </Button>
    </Form>
  );
}
