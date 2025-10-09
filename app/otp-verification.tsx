import ScreenLayout from "~/components/common/screen-layout";
import * as React from "react";
import { View } from "react-native";
import { FooterForgotPassword } from "~/components/screen/forgot-password/footer";
import { FormOTP } from "~/components/screen/forgot-password/form-otp";
import { HeaderOTPVerification } from "~/components/screen/forgot-password/otp-veryfy-header";
export default function VerifyCode() {
  return (
    <ScreenLayout>
      <View>
        <HeaderOTPVerification />
        <FormOTP />
        <FooterForgotPassword />
      </View>
    </ScreenLayout>
  );
}
