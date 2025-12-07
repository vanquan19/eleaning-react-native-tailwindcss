import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import * as React from "react";
import { View, Image } from "react-native";
import { TypographyH3, TypographyH4 } from "~/components/ui/typography-h2";
import i18n from "~/lib/i18n";

export function HeaderForgotPassword() {
  const router = useRouter();
  return (
    <View className="mb-8">
      <ChevronLeft onPress={() => router.back()} />
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
          {i18n.t("forgot-password.title")}
        </TypographyH3>
        <TypographyH4 className="text-primary text-center">
          {i18n.t("forgot-password.subtitle")}
        </TypographyH4>
      </View>
    </View>
  );
}
