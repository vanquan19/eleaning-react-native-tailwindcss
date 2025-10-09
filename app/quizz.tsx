import { useRoute } from "@react-navigation/native";
import React, { Fragment, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import { TypographyH4 } from "~/components/ui/typography-h2";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import {
  useExplanAnswer,
  useQuizAttempt,
  useQuizQuestions,
  useSubmitQuizAnswers,
} from "~/hooks/queries/useQuizz";
import { Choice, QuizQuestions, SubmitQuizAnswer } from "~/types/quizz.type";
import { Pressable } from "react-native";
import { Alert } from "react-native";
import { find } from "lodash-es";
import { BookOpen, Expand } from "lucide-react-native";
import { router } from "expo-router";
import { ROUTES } from "~/constants/router";

export default function Quizz() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [submitted, setSubmitted] = useState(false);
  const [questionExplained, setQuestionExplained] = useState<number | null>(
    null
  );
  const {
    data: quizAttemptData,
    isLoading,
    error: quizError,
  } = useQuizQuestions({
    quizId: Number(id),
    config: {
      enabled: !!id,
    },
  });

  const { data: quizResultData } = useQuizAttempt({
    attemptId: quizAttemptData?.data?.attemptId ?? 0,
    config: {
      enabled: submitted && quizAttemptData?.data?.attemptId !== undefined,
    },
  });

  const { data: quizExplanationData, isLoading: isLoadingExplanation } =
    useExplanAnswer({
      attemptId: quizAttemptData?.data?.attemptId ?? 0,
      questionId: questionExplained ?? 0,
      config: {
        enabled:
          submitted &&
          quizAttemptData?.data?.attemptId !== undefined &&
          questionExplained !== null,
      },
    });

  console.log("quizExplanationData", quizExplanationData);

  const { mutate: submitAnswers } = useSubmitQuizAnswers({
    config: {
      onSuccess: () => {
        setSubmitted(true);
      },
      onError: (error) => {
        ToastAndroid.show(
          error?.message || "Lỗi khi nộp bài kiểm tra",
          ToastAndroid.LONG
        );
      },
    },
  });

  const [selectedAnswers, setSelectedAnswers] = useState<SubmitQuizAnswer[]>(
    []
  );

  const handleSelectAnswer = ({ questionId, choiceId }: SubmitQuizAnswer) => {
    if (!submitted) {
      setSelectedAnswers((prev) =>
        prev.filter((answer) => answer.questionId !== questionId)
      );
      setSelectedAnswers((prev) => [...prev, { questionId, choiceId }]);
    }
  };

  const handleSubmit = () => {
    Alert.alert("Nộp bài", "Bạn có chắc muốn nộp bài kiểm tra?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Nộp bài",
        style: "default",
        onPress: () => {
          if (quizAttemptData?.data?.attemptId !== undefined) {
            submitAnswers({
              attemptId: quizAttemptData.data.attemptId,
              answers: selectedAnswers,
            });
          }
        },
      },
    ]);
  };

  const handleReset = () => {
    setSelectedAnswers([]);
    setSubmitted(false);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (quizError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500 text-lg">
          Lỗi khi tải dữ liệu bài kiểm tra
        </Text>
      </View>
    );
  }

  if (!quizAttemptData?.data || !quizAttemptData?.data?.questions) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-600 text-lg">
          Không có dữ liệu bài kiểm tra
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white mt-10">
      <ScrollView className="p-4">
        <TypographyH4 className="text-2xl font-bold">
          {quizAttemptData.data.quiz.title}
        </TypographyH4>
        <Text className="text-gray-600 mb-6">
          {quizAttemptData.data.quiz.description}
        </Text>

        {quizAttemptData.data.questions.map(
          (question: QuizQuestions, index: number) => (
            <Fragment key={question.id}>
              <View key={question.id} className="mb-6">
                <View className="mb-2 flex-row items-center justify-between">
                  <Text className="text-lg font-semibold mb-2 w-5/6">
                    Câu hỏi {index + 1}: {question.content}
                  </Text>
                  {submitted && (
                    <Button
                      variant="outline"
                      onPress={() => {
                        setQuestionExplained(question.id);
                      }}
                    >
                      {isLoadingExplanation &&
                      question.id === questionExplained ? (
                        <ActivityIndicator size="small" color="#0000ff" />
                      ) : (
                        <BookOpen size={16} />
                      )}
                    </Button>
                  )}
                </View>
                {question.choices.map((choice: Choice) => {
                  const answer = quizResultData?.data?.answers.find(
                    (a) =>
                      a.questionId === question.id && a.choiceId === choice.id
                  );
                  const isSelected = selectedAnswers.find(
                    (a) =>
                      a.questionId === question.id && a.choiceId === choice.id
                  );
                  return (
                    <Pressable
                      key={choice.id}
                      className={`p-3 mb-2 rounded-lg border ${
                        isSelected
                          ? "bg-blue-400 border-blue-500"
                          : "bg-gray-50 border-gray-300"
                      }  ${
                        submitted && answer?.isCorrect
                          ? "bg-green-600 border-green-700"
                          : ""
                      } `}
                      onPress={() =>
                        handleSelectAnswer({
                          questionId: question.id,
                          choiceId: choice.id,
                        })
                      }
                      disabled={submitted}
                    >
                      <Text
                        className={`${
                          isSelected
                            ? "text-white font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {choice.content}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              {submitted &&
                quizExplanationData?.data?.questionId === question.id && (
                  <View className="mb-6 p-4 bg-yellow-100 rounded-lg">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-lg font-semibold">Giải thích:</Text>
                    </View>
                    <Text className="text-gray-800">
                      {quizExplanationData?.data?.reasoning ||
                        "Không có giải thích"}
                    </Text>
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-lg font-semibold">Mẹo:</Text>
                    </View>
                    <Text className="text-gray-800">
                      {quizExplanationData?.data?.tip || "Không có mẹo"}
                    </Text>
                  </View>
                )}
            </Fragment>
          )
        )}

        {submitted && (
          <View className="mb-6 p-4 bg-gray-100 rounded-lg">
            <Text className="text-lg font-semibold">
              Điểm: {quizResultData?.data?.score} / {100}
            </Text>
            <Text className="text-gray-600">
              {quizResultData?.data?.score === 100
                ? "Xuất sắc! Bạn đạt điểm tối đa!"
                : "Tốt lắm! Đặt lại để thử lại."}
            </Text>
          </View>
        )}

        <View className="flex-row justify-between mb-10">
          <Button
            onPress={handleSubmit}
            disabled={
              submitted ||
              selectedAnswers.length !== quizAttemptData.data.questions.length
            }
            className="flex-1 mr-2"
          >
            <Text>Nộp bài</Text>
          </Button>
          <Button
            onPress={() => {
              if (submitted) {
                router.back();
              } else {
                handleReset();
              }
            }}
            variant="outline"
            className="flex-1 ml-2"
          >
            <Text>{submitted ? "Trở lại" : "Đặt lại"}</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
