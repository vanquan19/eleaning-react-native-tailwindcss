import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { BellRing, ShoppingCart } from "lucide-react-native";

import { ROUTES } from "~/constants/router";
import { Button } from "~/components/ui/button";
import { TypographyH3 } from "~/components/ui/typography-h2";
import authStore from "~/stores/auth.store";
import i18n from "~/lib/i18n";
import { useMyCart } from "~/hooks/queries/useCart";
import { useFocusEffect } from "@react-navigation/native";

export function HeaderHome() {
  const router = useRouter();
  const user = authStore.use.auth();
  const { data: dataMyCart, refetch: refetchMyCart } = useMyCart({
    config: { enabled: true },
  });

  useFocusEffect(
    React.useCallback(() => {
      refetchMyCart();
    }, [])
  );

  if (!user) {
    return (
      <View className="flex flex-row justify-between items-center mb-4 pt-2 pr-3">
        <TypographyH3 className="text-primary">E-Learning</TypographyH3>
        <Button size="sm" onPress={() => router.push(ROUTES.LOGIN.path)}>
          {i18n.t("buttons.login")}
        </Button>
      </View>
    );
  }

  return (
    <View className="mb-4 pt-2 pr-3">
      <View className="flex flex-row justify-between items-center">
        <TypographyH3 className="text-primary">E-Learning</TypographyH3>

        <View className="flex flex-row items-center space-x-4">
          <TouchableOpacity
            className="relative mr-3"
            onPress={() => router.push(ROUTES.CART.path)}
          >
            <ShoppingCart size={20} className="stroke-primary" />
            <View className="absolute -top-1 -right-1 bg-red-500 rounded-full h-4 w-4 flex items-center justify-center">
              <Text className="text-xs text-white">
                {dataMyCart?.data?.items.length || 0}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="relative"
            onPress={() => router.push(ROUTES.NOTIFICATION.path)}
          >
            <BellRing size={20} className="stroke-primary" />
            <View className="absolute -top-1 -right-1 bg-red-500 rounded-full h-4 w-4 flex items-center justify-center">
              <Text className="text-xs text-white">0</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
