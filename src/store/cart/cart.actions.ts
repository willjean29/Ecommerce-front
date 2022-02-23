import api from "api";
import { Dispatch } from "redux";
import { ShippingAddressDto } from "store/cart/dtos/cart.dtos";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CartDispatchTypes,
} from "store/cart/cart.types";
import { IProductDetailResponse } from "store/products/interfaces/product.interface";

export const addToCart =
  (id: string, qty: number) =>
  async (dispatch: Dispatch<CartDispatchTypes>) => {
    try {
      const {
        data: { product },
      } = await api.get<IProductDetailResponse>(`/products/${id}`);
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          qty,
        },
      });
      // localStorage.setItem("cartItems", JSON.stringify(state.products);
    } catch (error: any) {
      console.log(error);
    }
  };

export const removeToCart =
  (id: string) => (dispatch: Dispatch<CartDispatchTypes>) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });
  };

export const cartSaveShippingAddress =
  (data: ShippingAddressDto) => (dispatch: Dispatch<CartDispatchTypes>) => {
    console.log("guardar address");
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };

export const cartSavePaymentMethod =
  (data: any) => (dispatch: Dispatch<CartDispatchTypes>) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };
