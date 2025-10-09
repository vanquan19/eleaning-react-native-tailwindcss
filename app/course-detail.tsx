import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useCourseDetail } from "~/hooks/queries/useCourse";
import { SafeAreaView } from "react-native";
import { ChevronLeft, LockIcon } from "lucide-react-native";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import { useAddToCart } from "~/hooks/queries/useCart";
import { useEnrollmentFromCourse } from "~/hooks/queries/useEnrollment";
import {
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyP,
} from "~/components/ui/typography-h2";
import { useLessonFromCourse } from "~/hooks/queries/useLesson";
import { cn } from "~/lib/utils";
import { ROUTES } from "~/constants/router";
import authStore from "~/stores/auth.store";

export default function CourseDetail() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const auth = authStore.use.auth();
  const { data, isLoading, error } = useCourseDetail({
    courseId: id,
    config: {
      enabled: !!id,
    },
  });

  const { mutate: addToCart } = useAddToCart({
    config: {
      onSuccess: () => {
        ToastAndroid.show("Thêm vào giỏ hàng thành công", ToastAndroid.LONG);
      },
    },
  });

  const { data: lessonsData } = useLessonFromCourse({
    courseId: Number(id),
    config: {
      enabled: !!id,
    },
  });

  const { data: dataEnrolled } = useEnrollmentFromCourse({
    courseId: Number(id),
    config: {
      enabled: !!id,
    },
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Đã xảy ra lỗi khi tải dữ liệu</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    if (!data?.data?.id) return;
    addToCart(data?.data?.id);
  };

  const handleNavigateToLearning = () => {
    if (!data?.data?.id) return;
    if (
      Array.isArray(lessonsData?.data?.items) &&
      lessonsData.data.items.length <= 0
    ) {
      ToastAndroid.show("Khóa học chưa có bài học", ToastAndroid.LONG);
      return;
    }
    router.push({
      pathname: ROUTES.LESSON.path,
      params: { id: lessonsData?.data?.items[0]?.id, courseId: data?.data?.id },
    });
  };

  const handleNavigateToLesson = (lessonId: number) => {
    if (!data?.data?.id) return;
    if (!dataEnrolled?.data?.enrollment) {
      ToastAndroid.show(
        "Vui lòng đăng ký khóa học để học bài này",
        ToastAndroid.LONG
      );
      return;
    }
    router.push({
      pathname: ROUTES.LESSON.path,
      params: { id: lessonId, courseId: data?.data?.id },
    });
  };

  return (
    <SafeAreaView className="flex-1 py-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-4 left-4 z-10 h-12 w-12 p-0 rounded-xl shadow"
        >
          <ChevronLeft />
        </TouchableOpacity>
        <View className="pt-4">
          {/* Course Image */}
          <Image
            source={{ uri: data?.data?.image }}
            className="w-full h-56 rounded-b-xl mb-4"
            resizeMode="cover"
          />
        </View>
        <View className="px-6 my-4 flex flex-col gap-2">
          <TypographyH3 className="text-primary">
            {data?.data?.title}
          </TypographyH3>

          <TypographyP>{data?.data?.description}</TypographyP>
          <View className="flex-row items-center mb-4">
            <Image
              source={{
                uri: data?.data?.ownerAvatar || "https://i.pravatar.cc/300",
              }}
              className="w-10 h-10 rounded-full mr-3"
            />
            <View className="flex-1">
              <TypographyH5>{data?.data?.ownerName}</TypographyH5>
              <TypographyP>{data?.data?.ownerEmail}</TypographyP>
            </View>
          </View>

          {/* Pricing */}
          <View>
            <Text className="text-xl font-bold text-primary-500 mb-1">
              {data?.data?.price.toLocaleString("vi-VN")} ₫
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-between gap-4">
            {dataEnrolled?.data?.enrollment ? (
              <Button
                variant="outline"
                className="w-full"
                onPress={handleNavigateToLearning}
              >
                Bắt đầu học
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onPress={handleAddToCart}
                disabled={!auth}
              >
                Thêm vào giỏ hàng
              </Button>
            )}
          </View>
        </View>
        <View className="px-6 mb-4">
          <TypographyH4 className="mb-4">Nội dung khóa học</TypographyH4>
          {Array.isArray(lessonsData?.data?.items) &&
          lessonsData.data.items.length > 0 ? (
            lessonsData.data.items.map((lesson) => (
              <TouchableOpacity
                key={lesson.id}
                className="mb-1 bg-gray-50 p-3 rounded-lg flex flex-row items-center justify-between gap-2"
                onPress={() => handleNavigateToLesson(lesson.id)}
                activeOpacity={0.7}
              >
                <View className="relative ">
                  {!dataEnrolled?.data?.enrollment && (
                    <LockIcon
                      size={20}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: [
                          { translateX: "-50%" },
                          { translateY: "-50%" },
                        ],
                        zIndex: 10,
                      }}
                      color="#5850EC"
                    />
                  )}
                  <Image
                    source={require("../assets/images/logo-icon.png")}
                    className={cn(
                      "w-16 h-16 rounded-lg",
                      dataEnrolled?.data?.enrollment ? "" : "opacity-50"
                    )}
                    resizeMode="cover"
                  />
                </View>
                <View className="w-3/4">
                  <TypographyP
                    className="text-lg font-semibold text-gray-800"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {lesson.title}
                  </TypographyP>
                  <TypographyP
                    className="text-gray-600"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {lesson.description}
                  </TypographyP>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <TypographyP className="text-gray-600">
              Chưa có bài học nào trong khóa học này.
            </TypographyP>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
