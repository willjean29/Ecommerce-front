import { IOrderState } from "./interfaces/orderState.interface";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_ADMIN_LIST_REQUEST,
  ORDER_ADMIN_LIST_SUCCESS,
  ORDER_ADMIN_LIST_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_STATE_RESET,
  OrderDispatchTypes,
} from "store/orders/order.types";
const orderInitialState: IOrderState = {
  isLoading: false,
  error: "",
  orders: [],
  order: null,
  successOrder: false,
};

const OrderReducer = (
  state = orderInitialState,
  action: OrderDispatchTypes
) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case ORDER_DETAILS_REQUEST:
    case ORDER_LIST_REQUEST:
    case ORDER_PAY_REQUEST:
    case ORDER_ADMIN_LIST_REQUEST:
    case ORDER_DELIVERED_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_ORDER_SUCCESS:
    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: [...state.orders, action.payload],
        order: action.payload,
        successOrder: true,
      };
    case ORDER_DETAILS_SUCCESS:
    case ORDER_DELIVERED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: action.payload,
      };
    case ORDER_LIST_SUCCESS:
    case ORDER_ADMIN_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
      };
    case CREATE_ORDER_FAIL:
    case ORDER_DETAILS_FAIL:
    case ORDER_LIST_FAIL:
    case ORDER_PAY_FAIL:
    case ORDER_ADMIN_LIST_FAIL:
    case ORDER_DELIVERED_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        successOrder: false,
      };
    case ORDER_STATE_RESET:
      return orderInitialState;
    default:
      return state;
  }
};

export default OrderReducer;
