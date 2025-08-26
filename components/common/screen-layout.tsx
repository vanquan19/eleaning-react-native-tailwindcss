import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native";
export default function ScreenLayout({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView className="px-4">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView>{children}</ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
