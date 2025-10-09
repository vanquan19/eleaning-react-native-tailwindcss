import type { OrderType } from "~/types/enum";

import type { LucideIcon } from "lucide-react-native";

export type Meta = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

type TError = {
  code: string;
  message: string;
  details: {
    property: string;
  }[];
};

export type ResponseError = {
  error: TError;
  message?: string;
};

export type Response<T> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: TError;
  meta?: Meta;
  status?: number;
};

export type Pagination = {
  current: number;
  defaultCurrent: number;
  pageSize: number;
  total: number;
};

export type Option = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

export type BaseSearchDTO = {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDir?: OrderType;
};

export type MenuChild = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export type MenuGroup = {
  group: string;
  children: MenuChild[];
};

export type LoadMorePagination = {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
  totalPages: number;
};
