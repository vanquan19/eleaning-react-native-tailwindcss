import { API_ENDPOINTS } from "~/constants/api";
import { http } from "~/lib/http";
import { RegisterDTO } from "~/schema/auth.schema";
import type { Profile } from "~/types/auth.type";
import { Response } from "~/types/common.type";

export const getUserProfile = async (): Promise<Response<Profile>> => {
  return http.get<Response<Profile>>(API_ENDPOINTS.USER.PROFILE);
};

export const registerUser = async (
  data: Omit<RegisterDTO, "confirmPassword">
): Promise<Response<Profile>> => {
  return http.post<Omit<RegisterDTO, "confirmPassword">, Profile>(
    API_ENDPOINTS.AUTH.REGISTER,
    data
  );
};
