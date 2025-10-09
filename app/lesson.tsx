import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { use } from "react";
import { useRoute } from "@react-navigation/native";
import {
  useLessonDetail,
  useLessonFromCourse,
} from "~/hooks/queries/useLesson";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  TypographyH3,
  TypographyH5,
  TypographyP,
} from "~/components/ui/typography-h2";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { cn } from "~/lib/utils";
import { router } from "expo-router";
import { ROUTES } from "~/constants/router";
import { Lesson } from "~/types/lesson.type";
import { useCourseDetail } from "~/hooks/queries/useCourse";
import { useQuiz } from "~/hooks/queries/useQuizz";
import { File } from "lucide-react-native";

const Tab = createMaterialTopTabNavigator();

export default function LessonScreen() {
  const route = useRoute();
  const { id, courseId } = route.params as { id: string; courseId: string };

  const {
    data: dataLesson,
    isFetching: isFetchingLesson,
    error: errorLesson,
  } = useLessonDetail({
    lessonId: Number(id),
    config: {
      enabled: !!id,
    },
  });

  const { data: courseData } = useCourseDetail({
    courseId: courseId,
    config: {
      enabled: !!courseId,
    },
  });

  const player = useVideoPlayer(
    dataLesson?.data?.resourceUrl ??
      "https://www.w3schools.com/html/mov_bbb.mp4",
    (player) => {
      player.loop = true;
    }
  );

  if (isFetchingLesson) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (errorLesson) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Đã xảy ra lỗi khi tải dữ liệu</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 mt-10">
      <View className="items-center justify-center">
        <VideoView
          style={{
            width: "100%",
            backgroundColor: "black",
            aspectRatio: 16 / 9,
          }}
          player={player}
          fullscreenOptions={{
            enable: true,
          }}
        />
      </View>
      <View className="px-3 flex flex-col gap-2 mt-4 text-primary">
        <TypographyH3>{dataLesson?.data?.title}</TypographyH3>
        <TypographyP className="text-gray-600">
          {dataLesson?.data?.description}
        </TypographyP>
        <View className="flex-row items-center mt-2">
          <Image
            source={{
              uri: courseData?.data?.ownerAvatar || "https://i.pravatar.cc/300",
            }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <View className="flex-1">
            <TypographyH5>{courseData?.data?.ownerName}</TypographyH5>
            <TypographyP>{courseData?.data?.ownerEmail}</TypographyP>
          </View>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#6D28D9",
            height: 3,
            borderRadius: 2,
          },
          tabBarActiveTintColor: "#6D28D9",
          tabBarInactiveTintColor: "#ccc",
          tabBarStyle: {
            backgroundColor: "#fff",
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "700",
          },
        }}
        initialRouteName="Lesson"
      >
        <Tab.Screen name="Lesson" options={{ tabBarLabel: "Bài học" }}>
          {() => <LessonTab courseId={courseId} lessonId={Number(id)} />}
        </Tab.Screen>

        <Tab.Screen name="Quiz" options={{ tabBarLabel: "Quiz" }}>
          {() => <QuizTab id={id} player={player} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export function LessonTab({
  courseId,
  lessonId,
}: {
  courseId: string;
  lessonId: number;
}) {
  const { data: lessonsData, isLoading } = useLessonFromCourse({
    courseId: Number(courseId),
    config: {
      enabled: !!courseId,
    },
  });

  const handleChangeLesson = (lessonId: number) => {
    if (!lessonId) return;
    router.replace({
      pathname: ROUTES.LESSON.path,
      params: { id: lessonId, courseId },
    });
  };
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View className="mt-2">
      <ScrollView showsVerticalScrollIndicator={false}>
        {Array.isArray(lessonsData?.data?.items) &&
        lessonsData.data.items.length > 0 ? (
          lessonsData.data.items.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              className={cn(
                "  p-3 rounded-lg flex flex-row items-center justify-between gap-2",
                {
                  "bg-gray-100": lesson.id === lessonId,
                }
              )}
              activeOpacity={0.7}
              onPress={() => handleChangeLesson(lesson.id)}
            >
              <View className="relative">
                <Image
                  source={require("../assets/images/logo-icon.png")}
                  className="w-16 h-16 rounded-lg"
                  resizeMode="cover"
                />
              </View>
              <View className="w-4/5">
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
            Không còn bài học nào trong khóa học này.
          </TypographyP>
        )}
      </ScrollView>
    </View>
  );
}

export const QuizTab = ({ id, player }: { id: string; player: any }) => {
  const { data: quizData, isLoading } = useQuiz({
    lessonId: Number(id),
    config: {
      enabled: !!id,
    },
  });
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View className="flex-1">
      {quizData?.data && quizData.data.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {quizData.data.map((quiz) => (
            <TouchableOpacity
              key={quiz.id}
              className="p-4 bg-gray-50 w-full flex flex-row gap-2"
              onPress={() => {
                player.pause();
                router.push({
                  pathname: ROUTES.QUIZZ_DETAIL.path,
                  params: { id: quiz.id },
                });
              }}
            >
              <File size={24} color="#6D28D9" style={{ opacity: 0.8 }} />
              <TypographyH5 className="text-gray-800">
                {quiz.title}
              </TypographyH5>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <TypographyP>Không có bài kiểm tra nào trong bài học này</TypographyP>
      )}
    </View>
  );
};
