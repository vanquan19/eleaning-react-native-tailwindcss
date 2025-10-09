import * as React from "react";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { ROUTES } from "~/constants/router";

export function FooterForgotPassword() {
  const router = useRouter();
  return (
    <Text onPress={() => router.push(ROUTES.LOGIN.path)} className="p-2 ">
      <Text>Quay lại trang </Text>
      <Text className="text-primary font-medium">Đăng nhập</Text>
    </Text>
  );
}
