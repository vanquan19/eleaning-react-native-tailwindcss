import { ChatReq } from "~/types/chat.type";
import { http } from "~/lib/http";
import { Chat } from "~/types/chat.type";
import { ROUTES } from "~/constants/routes";
import { Response } from "~/types/common.type";

export const chatApi = ({ message, file }: ChatReq) => {
  console.log("file", file);
  return http.post<ChatReq, Chat>(
    ROUTES.CHATBOT.CHAT,
    { message, file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const deleteChatApi = () => http.delete(ROUTES.CHATBOT.DELETE);

export const getChatHistoryApi = () =>
  http.get<Response<{ items: Chat[] }>>(ROUTES.CHATBOT.GET);
