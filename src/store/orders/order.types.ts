import { Order } from "store/orders/interfaces/order.interface";
export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAIL = "CREATE_ORDER_FAIL";

export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAIL = "ORDER_DETAILS_FAIL";

export const ORDER_LIST_REQUEST = "ORDER_LIST_REQUEST";
export const ORDER_LIST_SUCCESS = "ORDER_LIST_SUCCESS";
export const ORDER_LIST_FAIL = "ORDER_LIST_FAIL";

export const ORDER_PAY_REQUEST = "ORDER_PAY_REQUEST";
export const ORDER_PAY_SUCCESS = "ORDER_PAY_SUCCESS";
export const ORDER_PAY_FAIL = "ORDER_PAY_FAIL";

export const ORDER_ADMIN_LIST_REQUEST = "ORDER_ADMIN_LIST_REQUEST";
export const ORDER_ADMIN_LIST_SUCCESS = "ORDER_ADMIN_LIST_SUCCESS";
export const ORDER_ADMIN_LIST_FAIL = "ORDER_ADMIN_LIST_FAIL";

export const ORDER_DELIVERED_REQUEST = "ORDER_DELIVERED_REQUEST";
export const ORDER_DELIVERED_SUCCESS = "ORDER_DELIVERED_SUCCESS";
export const ORDER_DELIVERED_FAIL = "ORDER_DELIVERED_FAIL";

export const ORDER_STATE_RESET = "ORDER_STATE_RESET";

export interface CreateOrderRequest {
  type: typeof CREATE_ORDER_REQUEST;
}

export interface CreateOrderSuccess {
  type: typeof CREATE_ORDER_SUCCESS;
  payload: Order;
}

export interface CreateOrderFail {
  type: typeof CREATE_ORDER_FAIL;
  payload: string;
}

export interface OrderDetailRequest {
  type: typeof ORDER_DETAILS_REQUEST;
}

export interface OrderDetailSuccess {
  type: typeof ORDER_DETAILS_SUCCESS;
  payload: Order;
}

export interface OrderDetailFail {
  type: typeof ORDER_DETAILS_FAIL;
  payload: string;
}

export interface OrderListRequest {
  type: typeof ORDER_LIST_REQUEST;
}

export interface OrderListSuccess {
  type: typeof ORDER_LIST_SUCCESS;
  payload: Order[];
}

export interface OrderListFail {
  type: typeof ORDER_LIST_FAIL;
  payload: string;
}

export interface OrderPayRequest {
  type: typeof ORDER_PAY_REQUEST;
}
export interface OrderPaySuccess {
  type: typeof ORDER_PAY_SUCCESS;
  payload: Order;
}
export interface OrderPayFail {
  type: typeof ORDER_PAY_FAIL;
  payload: string;
}

export interface OrderAdminListRequest {
  type: typeof ORDER_ADMIN_LIST_REQUEST;
}
export interface OrderAdminListSuccess {
  type: typeof ORDER_ADMIN_LIST_SUCCESS;
  payload: Order[];
}
export interface OrderAdminListFail {
  type: typeof ORDER_ADMIN_LIST_FAIL;
  payload: string;
}

export interface OrderDeliveredRequest {
  type: typeof ORDER_DELIVERED_REQUEST;
}
export interface OrderDeliveredSuccess {
  type: typeof ORDER_DELIVERED_SUCCESS;
  payload: Order;
}
export interface OrderDeliveredFail {
  type: typeof ORDER_DELIVERED_FAIL;
  payload: string;
}

export interface OrderStateReset {
  type: typeof ORDER_STATE_RESET;
}

export type OrderDispatchTypes =
  | CreateOrderRequest
  | CreateOrderSuccess
  | CreateOrderFail
  | OrderDetailRequest
  | OrderDetailSuccess
  | OrderDetailFail
  | OrderListRequest
  | OrderListSuccess
  | OrderListFail
  | OrderPayRequest
  | OrderPaySuccess
  | OrderPayFail
  | OrderAdminListRequest
  | OrderAdminListSuccess
  | OrderAdminListFail
  | OrderDeliveredRequest
  | OrderDeliveredSuccess
  | OrderDeliveredFail
  | OrderStateReset;
