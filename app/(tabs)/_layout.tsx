import { Tabs } from "expo-router";
import * as React from "react";
import { Platform } from "react-native";

import { HapticTab } from "~/components/common/HapticTab";
import TabBarBackground from "~/components/common/TabBarBackground";
import colors from "~/constants/colors";
import { TABS } from "~/constants/tabs";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      {TABS.NAVBAR.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => <tab.icon size={24} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}
