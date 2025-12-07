import { Controller, useForm } from "react-hook-form";
import * as React from "react";
import {
  OtpSchema,
  RegisterDTO,
  RegisterSchema,
  VerifyCodeDTO,
} from "~/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import i18n from "~/lib/i18n";
import { useRegister } from "~/hooks/queries/useUserQuery";

import { View, Text, ToastAndroid } from "react-native";
import { SimpleOTPInput } from "~/components/ui/input-otp";
import { useVerifyAccount } from "~/hooks/queries/useVerifyAccount";
import { router } from "expo-router";
import { ROUTES } from "~/constants/router";
import { toString } from "lodash-es";

const DEFAULT_VALUE = {
  email: "",
  password: "",
  confirmPassword: "",
  fullName: "",
};

export function FormRegister() {
  const [open, setOpen] = React.useState(false);
  const form = useForm<RegisterDTO>({
    defaultValues: DEFAULT_VALUE,
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeDTO>({
    defaultValues: {
      otp: "",
    },
    mode: "onSubmit",
  });

  const { mutate } = useRegister();
  const { mutate: verifyCode } = useVerifyAccount({
    config: {
      onSuccess: () => {
        setOpen(false);
        ToastAndroid.show(
          "Xác minh tài khoản thành công! Vui lòng đăng nhập.",
          ToastAndroid.LONG
        );
        form.reset();
        router.replace(ROUTES.LOGIN.path);
      },
      onError: (error) => {
        ToastAndroid.show(
          toString(error?.response?.data.message),
          ToastAndroid.LONG
        );
      },
    },
  });
  const onSubmitOTP = (data: VerifyCodeDTO) => {
    const otp = data.otp;
    verifyCode(otp);
  };
  const onSubmit = async (data: RegisterDTO) => {
    const { confirmPassword, ...rest } = data;
    mutate(rest, {
      onSuccess: () => {
        setOpen(true);
      },
    });
  };
  return (
    <>
      {open ? (
        <>
          <View className="absolute inset-0  flex items-center justify-center z-50">
            <View className="bg-white p-6 rounded-lg shadow-lg ">
              <View className="mb-4">
                <Text className="text-lg font-semibold text-center text-black">
                  Xác nhận OTP
                </Text>
              </View>
              <View className="mb-6">
                <Controller
                  control={control}
                  name="otp"
                  rules={{
                    required: "OTP is required",
                    pattern: {
                      value: /^\d{6}$/,
                      message: "OTP must be a 6-digit number",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <SimpleOTPInput
                      value={value}
                      onChange={onChange}
                      error={errors.otp?.message}
                    />
                  )}
                />
              </View>
              <View className="flex-row justify-end space-x-2">
                <Button
                  onPress={() => setOpen(false)}
                  className="bg-gray-300 px-4 py-2 mr-2"
                >
                  Hủy
                </Button>
                <Button onPress={handleSubmit(onSubmitOTP)}>
                  Xác nhận OTP
                </Button>
              </View>
            </View>
          </View>
        </>
      ) : (
        <Form {...form}>
          <Input
            control={form.control}
            placeholder={i18n.t("input.fullname")}
            name="fullName"
            error={form.formState.errors.fullName?.message}
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
            type="password"
            error={form.formState.errors.password?.message}
          />
          <Input
            control={form.control}
            placeholder={i18n.t("input.confirm-password")}
            name="confirmPassword"
            error={form.formState.errors.confirmPassword?.message}
            type="password"
          />
          <Button onPress={form.handleSubmit(onSubmit)} className="mb-2">
            {i18n.t("buttons.register")}
          </Button>
        </Form>
      )}
    </>
  );
}
