export interface OrderDto {
  user: string;
  orderItems: IOrderItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAddress: IShippingAddress;
  paymentMethod: string;
}

export interface UpdateOrderPayDto {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
}
