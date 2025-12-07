import { Role } from "~/types/enum";

export type Profile = {
  id: string;
  email: string;
  avatar?: string;
  fullName: string;
  roles?: Role[];
};

export type LoginResponse = {
  refreshToken: string;
  accessToken: string;
};

export type LogoutResponse = {
  success: boolean;
  message: string;
};
