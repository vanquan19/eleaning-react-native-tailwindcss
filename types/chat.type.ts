import { ChatRole } from "~/types/enum";

export type ChatReq = {
  message: string;
  file?: File;
};

export type Chat = {
  role: ChatRole;
  text: string;
};
