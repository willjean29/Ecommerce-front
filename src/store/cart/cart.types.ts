import { ProductCart } from "store/cart/interfaces/cart.interface";
import { ShippingAddressDto } from "./dtos/cart.dtos";

export const CART_ADD_ITEM = "CART_ADD_ITEM";
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";
export const CART_SAVE_SHIPPING_ADDRESS = "CART_SAVE_SHIPPING_ADDRESS";
export const CART_SAVE_PAYMENT_METHOD = "CART_SAVE_PAYMENT_METHOD";

export interface CartAddItem {
  type: typeof CART_ADD_ITEM;
  payload: ProductCart;
}

export interface CartRemoveItem {
  type: typeof CART_REMOVE_ITEM;
  payload: string;
}

export interface CartSaveShippingAddress {
  type: typeof CART_SAVE_SHIPPING_ADDRESS;
  payload: ShippingAddressDto;
}

export interface CartSavePaymentMethod {
  type: typeof CART_SAVE_PAYMENT_METHOD;
  payload: string;
}

export type CartDispatchTypes =
  | CartAddItem
  | CartRemoveItem
  | CartSaveShippingAddress
  | CartSavePaymentMethod;
