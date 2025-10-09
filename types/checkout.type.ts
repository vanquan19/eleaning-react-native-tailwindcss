import { OrderStatus } from "~/types/enum";

export type ZaloPayResponse = {
  orderId: string;
  zaloPayRes: {
    return_code: number;
    return_message: string;
    sub_return_code: number;
    sub_return_message: string;
    zp_trans_token: string;
    order_url: string;
    cashier_order_url: string;
    order_token: string;
    qr_code: string;
    app_trans_id: string;
  };
};

export type HistoryOrder = {
  id: number;
  totalAmount: number;
  status: OrderStatus;
  items: {
    id: number;
    courseId: string;
    courseTitle: string;
    priceAtPurchase: number;
  }[];
};
