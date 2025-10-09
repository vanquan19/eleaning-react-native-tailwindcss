import { router } from "expo-router";
import { Book } from "lucide-react-native";
import * as React from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native";
import ScreenLayout from "~/components/common/screen-layout";
import { CourseCardMini } from "~/components/common/simple-card";
import { Button } from "~/components/ui/button";
import { TypographyH3, TypographyP } from "~/components/ui/typography-h2";
import { ROUTES } from "~/constants/router";
import { useMyCourses } from "~/hooks/queries/useCourse";
import COLORS from "~/constants/colors";
import { useFocusEffect } from "@react-navigation/native";
import authStore from "~/stores/auth.store";
import { RequireLogin } from "~/components/common/require-login";
import { ActivityIndicator } from "react-native";

export default function LearnScreen() {
  const {
    data,
    isLoading,
    refetch: refetchMyCourses,
  } = useMyCourses({
    config: { enabled: true },
  });

  const auth = authStore.use.auth();

  useFocusEffect(
    React.useCallback(() => {
      refetchMyCourses();
    }, [])
  );
  if (!auth) {
    return <RequireLogin />;
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <ScreenLayout>
      <View>
        <TypographyH3 className="mb-4">Khóa học của tôi</TypographyH3>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Array.isArray(data?.data?.items) && data.data.items.length > 0 ? (
            data.data.items.map((item) => (
              <CourseCardMini
                key={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                image={item.image}
                rating={5}
                id={item.id}
              />
            ))
          ) : (
            <View className="flex flex-col items-center justify-center mt-44">
              <View className="p-6 mb-4 bg-gray-200 rounded-3xl overflow-hidden ">
                <Book size={42} color={COLORS.primary} />
              </View>
              <TypographyH3 className="mb-4">Không có khóa học</TypographyH3>
              <TypographyP className="mb-4">
                Hãy thêm một số khóa học để bắt đầu học tập
              </TypographyP>
              <Button onPress={() => router.replace(ROUTES.HOME.path)}>
                Tiếp tục mua sắm
              </Button>
            </View>
          )}
        </ScrollView>
      </View>
    </ScreenLayout>
  );
}
