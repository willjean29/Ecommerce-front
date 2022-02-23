import { Product } from "store/products//interfaces/product.interface";

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";

export const PRODUCT_DETAIL_REQUEST = "PRODUCT_DETAIL_REQUEST";
export const PRODUCT_DETAIL_SUCCESS = "PRODUCT_DETAIL_SUCCESS";
export const PRODUCT_DETAIL_FAIL = "PRODUCT_DETAIL_FAIL";

export const PRODUCT_DELETE_REQUEST = "PRODUCT_DELETE_REQUEST";
export const PRODUCT_DELETE_SUCCESS = "PRODUCT_DELETE_SUCCESS";
export const PRODUCT_DELETE_FAIL = "PRODUCT_DELETE_FAIL";

export const PRODUCT_UPDATE_REQUEST = "PRODUCT_UPDATE_REQUEST";
export const PRODUCT_UPDATE_SUCCESS = "PRODUCT_UPDATE_SUCCESS";
export const PRODUCT_UPDATE_FAIL = "PRODUCT_UPDATE_FAIL";

export const PRODUCT_CREATE_REQUEST = "PRODUCT_CREATE_REQUEST";
export const PRODUCT_CREATE_SUCCESS = "PRODUCT_CREATE_SUCCESS";
export const PRODUCT_CREATE_FAIL = "PRODUCT_CREATE_FAIL";

export const PRODUCT_CREATE_REVIEW_REQUEST = "PRODUCT_CREATE_REVIEW_REQUEST";
export const PRODUCT_CREATE_REVIEW_SUCCESS = "PRODUCT_CREATE_REVIEW_SUCCESS";
export const PRODUCT_CREATE_REVIEW_FAIL = "PRODUCT_CREATE_REVIEW_FAIL";

export const PRODUCT_TOP_REQUEST = "PRODUCT_TOP_REQUEST";
export const PRODUCT_TOP_SUCCESS = "PRODUCT_TOP_SUCCESS";
export const PRODUCT_TOP_FAIL = "PRODUCT_TOP_FAIL";

export interface ProductListRequest {
  type: typeof PRODUCT_LIST_REQUEST;
}
export interface ProductListSuccess {
  type: typeof PRODUCT_LIST_SUCCESS;
  payload: {
    products: Product[];
    page: number;
    pages: number;
  };
}
export interface ProductListFail {
  type: typeof PRODUCT_LIST_FAIL;
  payload: string;
}

export interface ProductDetailRequest {
  type: typeof PRODUCT_DETAIL_REQUEST;
}
export interface ProductDetailSuccess {
  type: typeof PRODUCT_DETAIL_SUCCESS;
  payload: Product;
}
export interface ProductDetailFail {
  type: typeof PRODUCT_DETAIL_FAIL;
  payload: string;
}

export interface ProductDeleteRequest {
  type: typeof PRODUCT_DELETE_REQUEST;
}
export interface ProductDeleteSuccess {
  type: typeof PRODUCT_DELETE_SUCCESS;
  payload: Product;
}
export interface ProductDeleteFail {
  type: typeof PRODUCT_DELETE_FAIL;
  payload: string;
}

export interface ProductUpdateRequest {
  type: typeof PRODUCT_UPDATE_REQUEST;
}
export interface ProductUpdateSuccess {
  type: typeof PRODUCT_UPDATE_SUCCESS;
  payload: Product;
}
export interface ProductUpdateFail {
  type: typeof PRODUCT_UPDATE_FAIL;
  payload: string;
}

export interface ProductCreateRequest {
  type: typeof PRODUCT_CREATE_REQUEST;
}
export interface ProductCreateSuccess {
  type: typeof PRODUCT_CREATE_SUCCESS;
  payload: Product;
}
export interface ProductCreateFail {
  type: typeof PRODUCT_CREATE_FAIL;
  payload: string;
}

export interface ProductCreateReviewRequest {
  type: typeof PRODUCT_CREATE_REVIEW_REQUEST;
}
export interface ProductCreateReviewSuccess {
  type: typeof PRODUCT_CREATE_REVIEW_SUCCESS;
  payload: Product;
}
export interface ProductCreateReviewFail {
  type: typeof PRODUCT_CREATE_REVIEW_FAIL;
  payload: string;
}

export interface ProductTopRequest {
  type: typeof PRODUCT_TOP_REQUEST;
}
export interface ProductTopSuccess {
  type: typeof PRODUCT_TOP_SUCCESS;
  payload: Product[];
}
export interface ProductTopFail {
  type: typeof PRODUCT_TOP_FAIL;
  payload: string;
}

export type ProductDispatchTypes =
  | ProductListRequest
  | ProductListSuccess
  | ProductListFail
  | ProductDetailRequest
  | ProductDetailSuccess
  | ProductDetailFail
  | ProductDeleteRequest
  | ProductDeleteSuccess
  | ProductDeleteFail
  | ProductUpdateRequest
  | ProductUpdateSuccess
  | ProductUpdateFail
  | ProductCreateRequest
  | ProductCreateSuccess
  | ProductCreateFail
  | ProductCreateReviewRequest
  | ProductCreateReviewSuccess
  | ProductCreateReviewFail
  | ProductTopRequest
  | ProductTopSuccess
  | ProductTopFail;
