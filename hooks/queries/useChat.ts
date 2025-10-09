import { useMutation, useQuery } from "@tanstack/react-query";
import { toString } from "lodash-es";
import { ToastAndroid } from "react-native";
import { chatApi, deleteChatApi, getChatHistoryApi } from "~/api/chatbot.api";
import { QUERIES_KEY } from "~/constants/queries-key";
import { MutationConfig, QueryConfig } from "~/lib/react-query";
import { Chat } from "~/types/chat.type";
import { Response } from "~/types/common.type";

type UseHistoryChatOption = { config?: QueryConfig<typeof getChatHistoryApi> };

export const useChatHistory = ({ config }: UseHistoryChatOption = {}) => {
  return useQuery<Response<{ items: Chat[] }>, Error>({
    queryKey: [QUERIES_KEY.CHAT_HISTORY.CHAT_HISTORY],
    queryFn: getChatHistoryApi,
    ...config,
  });
};

type UseChat = {
  config?: MutationConfig<typeof chatApi>;
};

export const useChat = ({ config }: UseChat = {}) => {
  return useMutation({
    ...config,
    mutationFn: chatApi,
    onError: (error) => {
      ToastAndroid.show(
        toString(error?.response?.data.message),
        ToastAndroid.LONG
      );
    },
  });
};

type UseDeleteChat = {
  config?: MutationConfig<typeof deleteChatApi>;
};

export const useDeleteChat = ({ config }: UseDeleteChat = {}) => {
  return useMutation({
    ...config,
    mutationFn: deleteChatApi,
    onError: (error) => {
      ToastAndroid.show(
        toString(error?.response?.data.message),
        ToastAndroid.LONG
      );
    },
  });
};
