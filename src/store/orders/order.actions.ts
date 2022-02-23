import { Dispatch } from "redux";
import api from "api";
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
  // ORDER_STATE_RESET,
  OrderDispatchTypes,
} from "store/orders/order.types";
import { IOrderResponse, IOrdersResponse } from "store/orders/interfaces/order.interface";
import { OrderDto, UpdateOrderPayDto } from "store/orders/dtos/orders.dtos";
export const createOrder = (data: OrderDto) => async (dispatch: Dispatch<OrderDispatchTypes>) => {
  dispatch({
    type: CREATE_ORDER_REQUEST,
  });
  try {
    const {
      data: { order },
    } = await api.post<IOrderResponse>("/orders", data);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: order,
    });
  } catch (error: any) {
    console.log("errorrrr");
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getOrderDetails = (id: string) => async (dispatch: Dispatch<OrderDispatchTypes>) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
  });
  try {
    const {
      data: { order },
    } = await api.get<IOrderResponse>(`/orders/${id}`);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: order,
    });
  } catch (error: any) {
    console.log(error);
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getOrdersList = () => async (dispatch: Dispatch<OrderDispatchTypes>) => {
  dispatch({
    type: ORDER_LIST_REQUEST,
  });
  try {
    const {
      data: { orders },
    } = await api.get<IOrdersResponse>("/orders/me");
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: orders,
    });
  } catch (error: any) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const payOrder =
  (id: string, payOrderDto: UpdateOrderPayDto) => async (dispatch: Dispatch<OrderDispatchTypes>) => {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    try {
      const {
        data: { order },
      } = await api.put<IOrderResponse>(`/orders/${id}/pay`, payOrderDto);
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: order,
      });
    } catch (error: any) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

export const getOrdersListAdmin = () => async (dispatch: Dispatch<OrderDispatchTypes>) => {
  dispatch({
    type: ORDER_ADMIN_LIST_REQUEST,
  });
  try {
    const {
      data: { orders },
    } = await api.get<IOrdersResponse>("/orders");
    console.log(orders);
    dispatch({
      type: ORDER_ADMIN_LIST_SUCCESS,
      payload: orders,
    });
  } catch (error: any) {
    dispatch({
      type: ORDER_ADMIN_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateDeliveredOrder = (id: string) => async (dispatch: Dispatch<OrderDispatchTypes>) => {
  dispatch({
    type: ORDER_DELIVERED_REQUEST,
  });
  try {
    const {
      data: { order },
    } = await api.put<IOrderResponse>(`/orders/${id}/deliver`);
    console.log(order);
    dispatch({
      type: ORDER_DELIVERED_SUCCESS,
      payload: order,
    });
  } catch (error: any) {
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
