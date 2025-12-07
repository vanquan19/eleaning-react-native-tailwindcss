import * as React from "react";
import { FlatList, Text } from "react-native";
import { View } from "react-native";
import { TypographyH4, TypographyH5 } from "~/components/ui/typography-h2";
import { Category } from "~/types/enum";

const Categorys = [
  { id: "1", title: Category.PROGRAMMING },
  { id: "2", title: Category.PHOTOGRAPHY },
  { id: "3", title: Category.MARKETING },
  { id: "4", title: Category.BUSINESS },
  { id: "5", title: Category.LANGUAGES },
  { id: "6", title: Category.MUSIC },
];

export function SimpleCategories() {
  return (
    <View className="flex flex-row mb-4 mx-1">
      <FlatList
        data={Categorys}
        renderItem={({ item }) => (
          <TypographyH5 className="px-4 py-2 border border-gray-100 rounded-full mr-3">
            {item.title}
          </TypographyH5>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
      <View className="items-center justify-center">
        {/* <TypographyH5 className="text-primary px-2">Xem tất cả</TypographyH5> */}
      </View>
    </View>
  );
}
