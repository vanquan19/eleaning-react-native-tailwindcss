import { useMutation, useQuery } from "@tanstack/react-query";
import { toString } from "lodash-es";
import { ToastAndroid } from "react-native";
import {
  addToCart,
  clearCart,
  getMyCart,
  removeFromCart,
} from "~/api/cart.api";
import { QUERIES_KEY } from "~/constants/queries-key";
import { MutationConfig, QueryConfig } from "~/lib/react-query";
import { CartItem } from "~/types/cart.type";
import { Response } from "~/types/common.type";

type UseMyCartOptions = { config?: QueryConfig<typeof getMyCart> };

export const useMyCart = ({ config }: UseMyCartOptions) => {
  return useQuery<
    Response<{
      items: CartItem[];
    }>,
    Error
  >({
    queryKey: [QUERIES_KEY.CART.MY_CART],
    queryFn: getMyCart,
    ...config,
  });
};

type UseAddToCartOptions = {
  config?: MutationConfig<typeof addToCart>;
};

export const useAddToCart = ({ config }: UseAddToCartOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: addToCart,
    onError: (error) => {
      ToastAndroid.show(
        toString(error?.response?.data.message),
        ToastAndroid.LONG
      );
    },
  });
};

type UseRemoveFromCartOptions = {
  config?: MutationConfig<typeof removeFromCart>;
};
export const useRemoveFromCart = ({
  config,
}: UseRemoveFromCartOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: removeFromCart,
    onError: (error) => {
      ToastAndroid.show(
        toString(error?.response?.data.message),
        ToastAndroid.LONG
      );
    },
  });
};

type UseClearCartOptions = {
  config?: MutationConfig<typeof clearCart>;
};

export const useClearCart = ({ config }: UseClearCartOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: clearCart,
    onError: (error) => {
      ToastAndroid.show(
        toString(error?.response?.data.message),
        ToastAndroid.LONG
      );
    },
  });
};
