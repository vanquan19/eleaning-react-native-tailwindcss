import { API_ENDPOINTS } from "~/constants/api";
import { http } from "~/lib/http";
import { CartItem } from "~/types/cart.type";
import { Response } from "~/types/common.type";

export const getMyCart = async () => {
  return http.get<Response<{ items: CartItem[] }>>(API_ENDPOINTS.CART.GET);
};

export const addToCart = async (courseId: string) => {
  return http.post<null, Response<{ items: CartItem[] }>>(
    API_ENDPOINTS.CART.ADD,
    null,
    {
      params: {
        courseId,
      },
    }
  );
};

export const removeFromCart = async (itemId: string) => {
  const endpoint = API_ENDPOINTS.CART.DELETE.replace(":itemId", itemId);
  return http.delete<Response<{ items: CartItem[] }>>(endpoint);
};

export const clearCart = async () => {
  return http.delete<Response<{ items: CartItem[] }>>(API_ENDPOINTS.CART.CLEAR);
};
