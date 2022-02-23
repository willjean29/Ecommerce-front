import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import RootReducer from "store/root.reducer";

const cartItemsToStorage = (data: any) => {
  const cartItems = JSON.stringify(data);
  localStorage.setItem("cartItems", cartItems);
};

export const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => cartItemsToStorage(store.getState().cart.products));

export type RootStore = ReturnType<typeof RootReducer>;
