export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/login",
  },
  EXAMPLE: "/example",
  TABLE: {
    SIMPLE: "/simple-table",
    SELECTED: "/selected-table",
  },
  PROFILE: {
    VIEW: "/profile",
    EDIT: "/update-profile",
    PASSWORD: "/change_password",
  },
  TASK: {
    LIST: "/tasks",
    DETAIL: "/tasks/:id",
    EDIT: "/edit-task/:id",
  },
  CHATBOT: {
    CHAT: "/chat",
    DELETE: "/chat",
    GET: "/chat/history",
  },
} as const;
