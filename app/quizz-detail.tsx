import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useHistoryAttempt } from "~/hooks/queries/useQuizz";
import { Text } from "~/components/ui/text";
import { TypographyH4 } from "~/components/ui/typography-h2";
import { Button } from "~/components/ui/button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HistoryAttempt } from "~/types/quizz.type";
import { router, useFocusEffect } from "expo-router";
import { ROUTES } from "~/constants/router";

export default function QuizzDetail() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { data: dataHistory, refetch: refetchHistory } = useHistoryAttempt({
    quizId: Number(id),
    config: {
      enabled: true,
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      refetchHistory();
    }, [])
  );

  const handleTakeQuiz = () => {
    router.push({ pathname: ROUTES.QUIZZ.path, params: { id: Number(id) } });
  };

  return (
    <SafeAreaView className="flex-1 bg-white mt-10">
      <ScrollView className="p-4 mb-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between mb-4">
          <TypographyH4 className="text-2xl font-bold">
            Lịch sử làm bài kiểm tra
          </TypographyH4>
          <Button onPress={handleTakeQuiz}>
            <Text>Làm bài kiểm tra</Text>
          </Button>
        </View>

        {dataHistory?.data?.items.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-600 text-lg">
              Chưa có lịch sử làm bài
            </Text>
          </View>
        ) : (
          dataHistory?.data?.items.map((attempt: HistoryAttempt, index) => (
            <View
              key={attempt.attemptId}
              className="mb-4 p-4 bg-gray-100 rounded-lg"
            >
              <Text className="text-lg font-semibold">
                Lần làm bài #{(dataHistory?.data?.items?.length ?? 0) - index}
              </Text>

              <Text className="text-gray-800">Điểm: {attempt.score} / 100</Text>
              <Text className="text-gray-600">
                Bắt đầu: {new Date(attempt.startedAt).toLocaleString()}
              </Text>
              <Text className="text-gray-600">
                Nộp bài:{" "}
                {attempt.submittedAt
                  ? new Date(attempt.submittedAt).toLocaleString()
                  : "Chưa nộp"}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
