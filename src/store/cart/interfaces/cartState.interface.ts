import { ProductCart } from "store/cart/interfaces/cart.interface";
import { ShippingAddressDto } from "store/cart/dtos/cart.dtos";

export interface ICartState {
  shippingAddress: ShippingAddressDto | null;
  paymentMethod: string;
  products: ProductCart[];
}
