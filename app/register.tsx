import React from "react";
import ScreenLayout from "~/components/common/screen-layout";
import { HeaderRegister } from "~/components/screen/register/header";
import { FormRegister } from "~/components/screen/register/form-register";
import { ScrollView } from "react-native";
import { FooterRegister } from "~/components/screen/register/footer";

export default function Register() {
  return (
    <ScreenLayout>
      <ScrollView>
        <HeaderRegister />
        <FormRegister />
        <FooterRegister />
      </ScrollView>
    </ScreenLayout>
  );
}
