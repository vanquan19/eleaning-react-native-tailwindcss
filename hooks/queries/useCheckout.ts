import { useMutation, useQuery } from "@tanstack/react-query";
import { toString } from "lodash-es";
import { ToastAndroid } from "react-native";
import {
  checkout,
  confirmOrder,
  getHistoryOrders,
  getOrderDetail,
} from "~/api/checkout.api";
import { QUERIES_KEY } from "~/constants/queries-key";
import { MutationConfig, QueryConfig } from "~/lib/react-query";
import { HistoryOrder } from "~/types/checkout.type";
import { Response } from "~/types/common.type";

type useCheckoutOptions = {
  config?: MutationConfig<typeof checkout>;
};

export const useCheckout = ({ config }: useCheckoutOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: checkout,
  });
};

type useHistoryOrdersOptions = {
  config?: QueryConfig<typeof getHistoryOrders>;
};

export const useHistoryOrders = ({ config }: useHistoryOrdersOptions) => {
  return useQuery<Response<HistoryOrder[]>, Error>({
    queryKey: [QUERIES_KEY.ORDER.HISTORY],
    queryFn: getHistoryOrders,
    ...config,
  });
};

type useHistoryDetailOptions = {
  config?: QueryConfig<typeof getOrderDetail>;
  orderId: string;
};

export const useHistoryDetail = ({
  config,
  orderId,
}: useHistoryDetailOptions) => {
  return useQuery<Response<HistoryOrder>, Error>({
    queryKey: [QUERIES_KEY.ORDER.DETAIL, orderId],
    queryFn: () => getOrderDetail(orderId),
    ...config,
  });
};

type useConfirmOrderOptions = {
  config?: MutationConfig<typeof confirmOrder>;
};

export const useConfirmOrder = ({ config }: useConfirmOrderOptions) => {
  return useMutation({
    ...config,
    mutationFn: (transactionId) =>
      confirmOrder({ apptransid: toString(transactionId) }),
  });
};
