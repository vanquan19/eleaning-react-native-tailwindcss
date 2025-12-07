import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { View, TextInput as RNTextInput, ToastAndroid } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ROUTES } from "~/constants/router";
import { useResetPassword } from "~/hooks/queries/useVerifyAccount";
import i18n from "~/lib/i18n";
import { OtpSchema, VerifyCodeDTO } from "~/schema/auth.schema";

export function FormOTP() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeDTO>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
      email: id,
    },
    mode: "onSubmit",
  });

  const { mutate } = useResetPassword({
    config: {
      onSuccess: () => {
        ToastAndroid.show(
          "Đặt lại mật khẩu thành công! Vui lòng đăng nhập.",
          ToastAndroid.LONG
        );
        router.replace(ROUTES.LOGIN.path);
      },
      onError: (error) => {
        ToastAndroid.show(
          error?.response?.data?.message || "Đã xảy ra lỗi.",
          ToastAndroid.LONG
        );
      },
    },
  });

  const onSubmit = (data: VerifyCodeDTO) => {
    mutate({
      email: data.email,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
      code: data.otp,
    });
  };

  return (
    <View className="p-4">
      <Input
        control={control}
        placeholder={i18n.t("input.password")}
        name="newPassword"
        error={errors.newPassword?.message}
      />
      <Input
        control={control}
        placeholder={i18n.t("input.confirm-password")}
        name="confirmPassword"
        error={errors.confirmPassword?.message}
      />
      <Input
        control={control}
        placeholder="Nhập mã OTP"
        name="otp"
        error={errors.otp?.message}
      />
      <Button onPress={handleSubmit(onSubmit)}>Xác nhận</Button>
    </View>
  );
}
