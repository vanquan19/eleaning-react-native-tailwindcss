import React from "react";
import { Text, View } from "react-native";
import { TypographyP } from "~/components/ui/typography-h2";

export function FooterLogin() {
  return (
    <TypographyP className="p-2 ">
      <Text>Chưa có tài khoản? </Text>
      <Text className="text-primary font-medium">Đăng ký ngay</Text>
    </TypographyP>
  );
}
