import { API_BASE_URL as ENV_API_BASE_URL } from "@env";

export const API_BASE_URL = ENV_API_BASE_URL || "http://localhost:3000/api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/authenticate",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    UPDATE_PROFILE: "/users/update-info",
    REGISTER: "/auth/register",
    ACTIVE_ACCOUNT: "/auth/activate-account",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_RESET_CODE: "/auth/verify-reset-code",
    RESET_PASSWORD: "/auth/reset-password",
    GOOGLE: "/auth/google",
  },
  USER: {
    PROFILE: "/user/current",
    CHANGE_PASSWORD: "/user/change-password",
  },
  MINIO: {
    PUT: "/storage/put",
    UPLOAD: "/storage/upload",
  },
  CART: {
    GET: "/cart",
    ADD: "/cart/add",
    DELETE: "/cart/item/:itemId",
    UPDATE: "/cart/clear",
    CLEAR: "/cart/clear",
  },
  ORDER: {
    POST: "/orders/checkout",
    GET: "/orders",
    GET_DETAIL: "/orders/:orderId",
    CONFIRM: "/payment/status/{appTransId}",
  },
  COURSE: {
    CREATE: "/course",
    GET: "/course/get/list",
    GET_TITLE: "/course/get/title",
    UPDATE: "/course/:courseId",
    GET_DETAIL: "/course/get/:courseId",
    MY_COURSES: "/course/get/my-courses",
    SEARCH_COURSES: "/course/title",
  },
  ENROLLMENT: {
    FROM_COURSE: "/enrollments/:courseId",
    MY_ENROLLMENTS: "/enrollments/my",
  },
  LESSON: {
    CREATE: "/lessons",
    PUT: "/lessons/:lessonId",
    PATCH: "/lessons/:lessonId",
    DELETE: "/lessons/:lessonId",
    GET: "/lessons",
    GET_DETAIL: "/lessons/:lessonId",
    GET_FROM_COURSE: "/lessons/course/:courseId",
  },
  CHAPTER: {
    GET: "/chapter/:chapterId",
    POST: "/chapter",
    PUT: "/chapter/:chapterId",
    DELETE: "/chapter/:chapterId",
    PATCH: "/chapter/:chapterId/reorder",
    PATCH_COURSE: "/chapter/courses/:courseId/reindex",
    GET_BY_COURSE: "/chapter/course/:courseId",
  },
  QUIZ: {
    GET_FROM_LESSON: "/quizzes/lesson/:lessonId",
    GET_DETAIL: "/quizzes/:quizId",
    GET_QUESTIONS: "/questions/quiz/:quizId",
    QUIZ_START: "/quiz-attempts/start",
    QUIZ_SUBMIT: "/quiz-attempts/:attemptId/submit",
    QUIZ_RESULT: "/quiz-attempts/:attemptId",
    HISTORY_ATTEMPT: "/quiz-attempts/my",
    EXPLAN_ANSWER:
      "/quiz-attempts/:attemptId/questions/:questionId/explanation",
  },
  CHATBOT: {
    CHAT: "/chat",
    DELETE: "/chat/:chatId",
    GET: "/chat/history",
  },
};

export const API_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  ERR_NETWORK: "ERR_NETWORK",
};

export const ERROR_FORBIDDEN_MESSAGE = "Forbidden";
