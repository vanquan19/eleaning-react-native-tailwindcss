import { toString } from "lodash-es";
import { API_ENDPOINTS } from "~/constants/api";
import { http } from "~/lib/http";
import { Response } from "~/types/common.type";
import {
  AnswerExplanation,
  HistoryAttempt,
  Quiz,
  QuizAttempt,
  QuizAttemptResult,
  SubmitQuizAnswer,
} from "~/types/quizz.type";

export const getQuizFormLesson = (lessonId: number) => {
  return http.get<Response<Quiz[]>>(
    API_ENDPOINTS.QUIZ.GET_FROM_LESSON.replace(":lessonId", toString(lessonId))
  );
};

export const getQuizDetail = (quizId: number) => {
  return http.get<Response<Quiz>>(
    API_ENDPOINTS.QUIZ.GET_DETAIL.replace(":quizId", toString(quizId))
  );
};

export const getQuizQuestions = (quizId: number) => {
  return http.get<Response<QuizAttempt>>(API_ENDPOINTS.QUIZ.QUIZ_START, {
    params: { quizId: toString(quizId) },
  });
};

export const submitQuizAnswers = ({
  attemptId,
  answers,
}: {
  attemptId: number;
  answers: SubmitQuizAnswer[];
}) => {
  return http.post<{ answers: SubmitQuizAnswer[] }, Response<QuizAttempt>>(
    API_ENDPOINTS.QUIZ.QUIZ_SUBMIT.replace(":attemptId", toString(attemptId)),
    {
      answers,
    }
  );
};

export const getQuizAttemptResult = (attemptId: number) => {
  return http.get<Response<QuizAttemptResult>>(
    API_ENDPOINTS.QUIZ.QUIZ_RESULT.replace(":attemptId", toString(attemptId))
  );
};

export const getHistoryAttempt = (quizId: number) => {
  return http.get<Response<{ items: HistoryAttempt[] }>>(
    API_ENDPOINTS.QUIZ.HISTORY_ATTEMPT,
    {
      params: { quizId: toString(quizId), pageNo: 0, pageSize: 50 },
    }
  );
};

export const explainAnswer = (attemptId: number, questionId: number) => {
  return http.get<Response<AnswerExplanation>>(
    API_ENDPOINTS.QUIZ.EXPLAN_ANSWER.replace(
      ":attemptId",
      toString(attemptId)
    ).replace(":questionId", toString(questionId))
  );
};
