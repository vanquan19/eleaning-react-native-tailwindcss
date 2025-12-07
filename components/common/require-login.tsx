import React from "react";
import { View, ImageBackground, Image } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { Button } from "~/components/ui/button";
import { ROUTES } from "~/constants/router";
import { TypographyH3 } from "../ui/typography-h2";
import i18n from "~/lib/i18n";

export function RequireLogin() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="my-auto px-8">
      <View className="">
        <Image
          source={require("~/assets/images/group-icon.png")}
          style={{
            width: "100%",
            height: 180,
          }}
          resizeMode="contain"
        />
      </View>
      <View>
        <TypographyH3 className="text-primary text-center">
          {i18n.t("login.welcome-back")}
        </TypographyH3>
        <TypographyH3 className="text-primary text-center">
          {i18n.t("login.login-to-continue")}
        </TypographyH3>
        <Button
          variant="outline"
          className="mt-4 mx-auto w-full"
          onPress={() => router.push(ROUTES.LOGIN.path)}
        >
          {t("buttons.login")}
        </Button>
      </View>
    </View>
  );
}
