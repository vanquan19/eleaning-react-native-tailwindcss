import * as React from "react";
import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { ROUTES } from "~/constants/router";

export default function NotFoundScreen() {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text>This screen doesn't exist.</Text>
        <Link href={ROUTES.HOME.path}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
