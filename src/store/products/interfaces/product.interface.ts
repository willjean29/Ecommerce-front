// Generated by https://quicktype.io

export interface IProductResponse {
  success: boolean;
  products: Product[];
  page?: number;
  pages?: number;
}
export interface IProductDetailResponse {
  success: boolean;
  product: Product;
}

export interface Product {
  _id: string;
  user: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  reviews: Review[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}

// Generated by https://quicktype.io

export interface Review {
  name: string;
  rating: number;
  comment: string;
  user: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
