import * as React from "react";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { ROUTES } from "~/constants/router";

export function FooterLogin() {
  const router = useRouter();
  return (
    <Text onPress={() => router.push(ROUTES.REGISTER.path)} className="p-2 ">
      <Text>Chưa có tài khoản? </Text>
      <Text className="text-primary font-medium">Đăng ký ngay</Text>
    </Text>
  );
}
