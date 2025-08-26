import { useForm } from "react-hook-form";
import * as React from "react";
import { RegisterDTO, RegisterSchema } from "~/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import i18n from "~/lib/i18n";

const DEFAULT_VALUE = {
  email: "",
  password: "",
  confirmPassword: "",
  fullname: "",
};

export function FormRegister() {
  const form = useForm<RegisterDTO>({
    defaultValues: DEFAULT_VALUE,
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit = (data: RegisterDTO) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <Input
        control={form.control}
        placeholder={i18n.t("input.fullname")}
        name="fullname"
        error={form.formState.errors.fullname?.message}
      />
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
      <Input
        control={form.control}
        placeholder={i18n.t("input.confirm-password")}
        name="confirmPassword"
        error={form.formState.errors.confirmPassword?.message}
      />
      <Button onPress={form.handleSubmit(onSubmit)} className="mb-2">
        {i18n.t("buttons.register")}
      </Button>
    </Form>
  );
}
