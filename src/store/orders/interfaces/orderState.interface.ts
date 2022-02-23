import { Order } from "store/orders/interfaces/order.interface";
export interface IOrderState {
  isLoading: boolean;
  error: string;
  orders: Order[];
  order: Order | null;
  successOrder: boolean;
}
