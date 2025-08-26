export const ROUTES = {
  HOME: {
    name: "index",
    path: "/",
  },
  LOGIN: {
    name: "login",
    path: "/login",
  },
  REGISTER: {
    name: "register",
    path: "/register",
  },
  FORGOT_PASSWORD: {
    name: "forgot-password",
    path: "/forgot-password",
  },
  OTP_VERIFICATION: {
    name: "otp-verification",
    path: "/otp-verification",
  },
  RESET_PASSWORD: {
    name: "reset-password",
    path: "/reset-password",
  },
  CATEGORY: {
    name: "category",
    path: "/category",
  },
  COURSE_DETAIL: {
    name: "course-detail/[id]",
    path: "/course-detail/[id]",
  },
  PROFILE: {
    name: "profile",
    path: "/profile",
  },
  SETTINGS: {
    name: "settings",
    path: "/settings",
  },
  NOT_FOUND: {
    name: "not-found",
    path: "/not-found",
  },
} as const;
