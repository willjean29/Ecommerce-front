import { combineReducers } from "redux";
import ProductReducer from "store/products/product.reducer";
import CartReducer from "store/cart/cart.reducer";
import UserReducer from "store/users/user.reducer";
import OrdersReducer from "store/orders/order.reducer";
const rootReducer = combineReducers({
  user: UserReducer,
  produts: ProductReducer,
  cart: CartReducer,
  orders: OrdersReducer,
});

export default rootReducer;
