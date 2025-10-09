import { API_ENDPOINTS } from "~/constants/api";
import { http } from "~/lib/http";
import { ZaloPayResponse, HistoryOrder } from "~/types/checkout.type";
import { Response } from "~/types/common.type";

export const checkout = async () => {
  return http.post<null, Response<ZaloPayResponse>>(
    API_ENDPOINTS.ORDER.POST,
    null
  );
};

export const getHistoryOrders = async () => {
  return http.get<Response<HistoryOrder[]>>(API_ENDPOINTS.ORDER.GET);
};

export const getOrderDetail = async (orderId: string) => {
  const endpoint = API_ENDPOINTS.ORDER.GET_DETAIL.replace(":orderId", orderId);
  return http.get<Response<HistoryOrder>>(endpoint);
};

export const confirmOrder = async (data: { apptransid: string }) => {
  return http.get(
    API_ENDPOINTS.ORDER.CONFIRM.replace(":apptransid", data.apptransid)
  );
};
