import * as React from "react";
import { View } from "react-native";

import ScreenLayout from "~/components/common/screen-layout";
import { FooterLogin } from "~/components/screen/login/footer";
import { FormLogin } from "~/components/screen/login/form-login";
import { HeaderLogin } from "~/components/screen/login/header";
import { OptionLogin } from "~/components/screen/login/option-login";

export default function Screen() {
  return (
    <ScreenLayout>
      <View>
        <HeaderLogin />
        <FormLogin />
        {/* <OptionLogin /> */}
        <FooterLogin />
      </View>
    </ScreenLayout>
  );
}
