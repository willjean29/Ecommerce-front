import { ICartState } from "store/cart/interfaces/cartState.interface";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CartDispatchTypes,
} from "store/cart/cart.types";
const cartinitialState: ICartState = {
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress")!)
    : null,
  products: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [],
  paymentMethod: localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod")!)
    : "",
};

const cartReducer = (
  state: ICartState = cartinitialState,
  action: CartDispatchTypes
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const existItem = state.products.find(
        (x) => x.product === action.payload.product
      );
      if (existItem) {
        return {
          ...state,
          products: state.products.map((x) =>
            x.product === existItem.product ? action.payload : x
          ),
        };
      } else {
        return {
          ...state,
          products: [...state.products, action.payload],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.product !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
