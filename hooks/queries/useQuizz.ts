import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getQuizFormLesson,
  getQuizDetail,
  getQuizQuestions,
  submitQuizAnswers,
  getQuizAttemptResult,
  getHistoryAttempt,
  explainAnswer,
} from "~/api/quizz.api";
import { QUERIES_KEY } from "~/constants/queries-key";
import { MutationConfig, QueryConfig } from "~/lib/react-query";
import { Response } from "~/types/common.type";
import {
  Quiz,
  QuizAttempt,
  QuizAttemptResult,
  HistoryAttempt,
  AnswerExplanation,
} from "~/types/quizz.type";

type UseQuizOptions = {
  lessonId: number;
  config?: QueryConfig<typeof getQuizFormLesson>;
};

export const useQuiz = ({ config, lessonId }: UseQuizOptions) => {
  return useQuery<Response<Quiz[]>, Error>({
    queryKey: [QUERIES_KEY.QUIZ.LIST, lessonId],
    queryFn: () => getQuizFormLesson(lessonId),
    ...config,
  });
};

type UseQuizDetailOptions = {
  quizId: number;
  config?: QueryConfig<typeof getQuizDetail>;
};

export const useQuizDetail = ({ config, quizId }: UseQuizDetailOptions) => {
  return useQuery<Response<Quiz>, Error>({
    queryKey: [QUERIES_KEY.QUIZ.DETAIL, quizId],
    queryFn: () => getQuizDetail(quizId),
    ...config,
  });
};

type UseQuizzQuestionsOptions = {
  quizId: number;
  config?: QueryConfig<typeof getQuizQuestions>;
};

export const useQuizQuestions = ({
  config,
  quizId,
}: UseQuizzQuestionsOptions) => {
  return useQuery<Response<QuizAttempt>, Error>({
    queryKey: [QUERIES_KEY.QUIZ.QUESTIONS, quizId],
    queryFn: () => getQuizQuestions(quizId),
    ...config,
  });
};

type useSubmitQuizAnswersOptions = {
  config?: MutationConfig<typeof submitQuizAnswers>;
};

export const useSubmitQuizAnswers = ({
  config,
}: useSubmitQuizAnswersOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: submitQuizAnswers,
  });
};

type UseQuizAttemptOptions = {
  attemptId: number;
  config?: QueryConfig<typeof getQuizAttemptResult>;
};

export const useQuizAttempt = ({
  config,
  attemptId,
}: UseQuizAttemptOptions) => {
  return useQuery<Response<QuizAttemptResult>, Error>({
    queryKey: [QUERIES_KEY.QUIZ.ATTEMPT, attemptId],
    queryFn: () => getQuizAttemptResult(attemptId),
    ...config,
  });
};

type UseHistoryAttemptOptions = {
  quizId: number;
  config?: QueryConfig<typeof getHistoryAttempt>;
};

export const useHistoryAttempt = ({
  config,
  quizId,
}: UseHistoryAttemptOptions) => {
  return useQuery<Response<{ items: HistoryAttempt[] }>, Error>({
    queryKey: [QUERIES_KEY.QUIZ.HISTORY, quizId],
    queryFn: () => getHistoryAttempt(quizId),
    ...config,
  });
};

type UseExplanAnswerOptions = {
  attemptId: number;
  questionId: number;
  config?: QueryConfig<typeof explainAnswer>;
};

export const useExplanAnswer = ({
  config,
  attemptId,
  questionId,
}: UseExplanAnswerOptions) => {
  return useQuery<Response<AnswerExplanation>, Error>({
    queryKey: [QUERIES_KEY.QUIZ.EXPLAN_ANSWER, attemptId, questionId],
    queryFn: () => explainAnswer(attemptId, questionId),
    ...config,
  });
};
