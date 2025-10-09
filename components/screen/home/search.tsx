import * as React from "react";
import { TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { ROUTES } from "~/constants/router";

export function SearchInput() {
  const router = useRouter();
  return (
    <View className="mb-4 h-fit relative">
      <TextInput
        onFocus={() => router.push(ROUTES.SEARCH.path)}
        placeholder="Tìm kiếm khóa học..."
        className="px-6 py-4 text-lg border border-gray-200 rounded-3xl focus:border-primary mx-1 placeholder:font-medium placeholder:text-gray-400"
      />
    </View>
  );
}
