import React from "react";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { ROUTES } from "~/constants/router";

export function FooterRegister() {
  const router = useRouter();
  return (
    <Text onPress={() => router.push(ROUTES.LOGIN.path)} className="p-2">
      <Text>Đã có tài khoản? </Text>
      <Text className="text-primary font-medium">Đăng nhập ngay</Text>
    </Text>
  );
}
