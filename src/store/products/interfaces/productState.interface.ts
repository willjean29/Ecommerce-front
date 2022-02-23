import { Product } from "store/products/interfaces/product.interface";

export interface IProductState {
  products: Product[];
  isLoading: boolean;
  isLoadingTop: boolean;
  productsTop: Product[];
  error: string;
  product: Product | null;
  success: boolean;
  page: number;
  pages: number;
}
