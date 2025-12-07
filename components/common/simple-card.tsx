import * as React from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { cn } from "~/lib/utils";
import { LayoutType, Tag } from "~/types/enum";
import { RenderStars } from "~/components/common/RenderStar";
import { TypographyH5 } from "~/components/ui/typography-h2";
import { router } from "expo-router";
import { ROUTES } from "~/constants/router";

type CourseCardProps = {
  title: string;
  description?: string;
  rating?: number;
  image?: string;
  type?: LayoutType;
  tag?: string;
  price?: number;
  id?: string;
};

export default function CourseCard({
  title,
  description,
  rating,
  image,
  type = LayoutType.Default,
  tag,
  price,
  id,
}: CourseCardProps) {
  return (
    <TouchableOpacity
      className="dark:bg-gray-800 rounded-lg bg-gray-50 p-4 w-60 mr-4"
      onPress={() =>
        id &&
        router.push({
          pathname: ROUTES.COURSE_DETAIL.path,
          params: { id },
        })
      }
    >
      {image && (
        <View className="mb-4">
          <Image
            source={{ uri: image }}
            alt={title}
            className={`w-full h-48 object-cover rounded-md ${
              type === LayoutType.Vertical ? "h-24" : "h-32"
            }`}
          />
          {tag && (
            <View
              className={cn(
                "absolute top-2 left-2  px-2 py-1 rounded",
                tag === Tag.NEW
                  ? "bg-red-500"
                  : tag === Tag.POPULAR
                  ? "bg-green-500"
                  : "bg-blue-500"
              )}
            >
              <Text className="text-white text-xs font-bold">{tag}</Text>
            </View>
          )}
        </View>
      )}
      <View className="flex flex-col gap-1">
        <TypographyH5
          className="text-gray-900 dark:text-white line-clamp-2"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </TypographyH5>
        {description && (
          <Text
            className="text-gray-600 text-sm dark:text-gray-300 mb-2"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
        )}
        {rating !== undefined && <RenderStars rating={rating} />}
        {price && (
          <Text className="text-gray-900 dark:text-white font-bold">
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export function CourseCardMini({
  title,
  image,
  description,
  rating,
  price,
  id,
}: {
  title: string;
  image?: string;
  description?: string;
  rating?: number;
  price?: number;
  id?: string;
}) {
  return (
    <TouchableOpacity
      className="flex flex-row dark:bg-gray-800 rounded-lg bg-gray-50 w-full mb-2"
      onPress={() =>
        id &&
        router.push({
          pathname: ROUTES.COURSE_DETAIL.path,
          params: { id },
        })
      }
    >
      {image && (
        <View>
          <Image
            source={{ uri: image }}
            alt={title}
            className="w-32 h-32 object-cover rounded-md my-auto"
          />
        </View>
      )}
      <View className="p-4">
        <TypographyH5
          className="text-gray-900 dark:text-white line-clamp-2"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </TypographyH5>
        {description && (
          <Text
            className="text-gray-600 text-sm dark:text-gray-300 mb-2 truncate"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
        )}
        <View>
          {rating !== undefined && <RenderStars rating={rating} />}
          {price && (
            <Text className="text-gray-900 dark:text-white font-bold">
              {price.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
