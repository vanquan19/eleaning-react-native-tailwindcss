import ScreenLayout from "~/components/common/screen-layout";
import * as React from "react";
import { View } from "react-native";
import { HeaderForgotPassword } from "~/components/screen/forgot-password/header";
import { FormForgotPassword } from "~/components/screen/forgot-password/form-forgot-password";
import { FooterForgotPassword } from "~/components/screen/forgot-password/footer";
export default function ForgotPassword() {
  return (
    <ScreenLayout>
      <View>
        <HeaderForgotPassword />
        <FormForgotPassword />
        <FooterForgotPassword />
      </View>
    </ScreenLayout>
  );
}
