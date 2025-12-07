import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from "react-native";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { ChevronLeft, Send, X } from "lucide-react-native";
import { router, useFocusEffect } from "expo-router";
import {
  useChat,
  useChatHistory,
  useDeleteChat,
} from "~/hooks/queries/useChat";
import { Chat } from "~/types/chat.type";
import { ChatRole } from "~/types/enum";

export default function Chatbot() {
  const [messages, setMessages] = useState<Chat[]>([
    {
      text: "Xin chào! Mình có thể giúp gì cho bạn hôm nay?",
      role: ChatRole.ASSISTANT,
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<ScrollView | null>(null);
  const [state, setState] = useState<any>({});

  const { data: chatHistory, refetch: refetchChatHistory } = useChatHistory();
  const { mutate: chat } = useChat({
    config: {
      onSuccess(data) {
        if (!data?.data) return;
        setMessages((prev) => [...prev, data.data as Chat]);
      },
    },
  });

  const { mutate: deleteChat } = useDeleteChat({
    config: {
      onSuccess() {
        setMessages([
          {
            text: "Xin chào! Mình có thể giúp gì cho bạn hôm nay?",
            role: ChatRole.ASSISTANT,
          },
        ]);
        refetchChatHistory();
      },
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      if (chatHistory?.data?.items.length) {
        setMessages(chatHistory.data.items);
      }
    }, [chatHistory])
  );

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, role: ChatRole.USER }]);
    chat({ message: input, file: state.file || null });
    setInput("");
    setState({ file: null });
  };
  const handleDeleteChat = () => {
    deleteChat(undefined);
  };

  return (
    <>
      <View className="w-full border-b border-muted px-4 py-3 flex-row mt-10 items-center justify-between">
        <View className="flex-row items-center">
          <Button variant="ghost" size="sm" onPress={() => router.back()}>
            <ChevronLeft className="text-2xl text-foreground mr-3" />
          </Button>
          <Avatar alt="chatbot-avatar">
            <AvatarImage source={require("../assets/images/logo-icon.png")} />
          </Avatar>
          <View className="ml-3">
            <Text className="text-base font-medium text-foreground">
              Chatbot
            </Text>
            <Text className="text-sm text-muted-foreground">
              Trợ lý học tập
            </Text>
          </View>
        </View>
        <Button variant="ghost" size="sm" onPress={handleDeleteChat}>
          Xóa cuộc trò chuyện
        </Button>
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        className="flex-1"
      >
        {messages.length === 0 && (
          <View className="items-center mt-8">
            <Text className="text-muted-foreground">
              Chưa có tin nhắn nào — bắt đầu trò chuyện nhé.
            </Text>
          </View>
        )}

        {messages.map((m, index) => (
          <View
            key={index}
            className={
              m.role === ChatRole.USER
                ? "self-end max-w-[80%] mb-3 rounded-xl bg-primary px-4 py-2"
                : "self-start max-w-[80%] mb-3 rounded-xl bg-muted px-4 py-2"
            }
          >
            <Text
              className={
                m.role === ChatRole.USER
                  ? "text-primary-foreground"
                  : "text-foreground"
              }
            >
              {m.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className="border-t border-muted px-4 py-3">
        {state.file && (
          <View className="mb-2 px-3  rounded-lg flex-row items-center justify-between">
            <Text className="flex-1 mr-4 text-sm text-gray-700">
              {state.file.assets[0].name}
            </Text>
            <Button
              variant="ghost"
              size="sm"
              onPress={() => setState({ file: null })}
            >
              <X size={16} className="text-lg text-gray-500" />
            </Button>
          </View>
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 bg-background mt-10"
        >
          <View className="flex-row items-end space-x-3 gap-3">
            <View className="flex-1">
              <Textarea
                value={input}
                onChangeText={setInput}
                placeholder="Gõ tin nhắn..."
                className="rounded-lg border border-muted px-3 py-3 text-base"
                onKeyPress={(e: any) => {
                  const isWeb = Platform.OS === "web";
                  const isEnter = e?.nativeEvent?.key === "Enter";
                  const isNotShift = !e?.nativeEvent?.shiftKey;
                  if (isWeb && isEnter && isNotShift) {
                    e.preventDefault?.();
                    handleSend();
                  }
                }}
              />
            </View>

            <Button onPress={handleSend} disabled={!input.trim()}>
              <Send size={20} color={"#fff"} />
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
