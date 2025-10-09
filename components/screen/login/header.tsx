import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import * as React from "react";
import { View, Image } from "react-native";
import { TypographyH3 } from "~/components/ui/typography-h2";
import { ROUTES } from "~/constants/router";
import i18n from "~/lib/i18n";

export function HeaderLogin() {
  const router = useRouter();
  return (
    <View className="mb-8">
      <ChevronLeft onPress={() => router.replace(ROUTES.HOME.path)} />
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
      </View>
    </View>
  );
}
