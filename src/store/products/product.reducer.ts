import { IProductState } from "store/products/interfaces/productState.interface";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  ProductDispatchTypes,
} from "store/products/product.types";

const productInitialState: IProductState = {
  products: [],
  productsTop: [],
  isLoading: false,
  isLoadingTop: false,
  error: "",
  product: null,
  success: false,
  page: 1,
  pages: 1,
};

const productReducer = (state = productInitialState, action: ProductDispatchTypes) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
    case PRODUCT_DETAIL_REQUEST:
    case PRODUCT_DELETE_REQUEST:
    case PRODUCT_UPDATE_REQUEST:
    case PRODUCT_CREATE_REQUEST:
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
      };
    case PRODUCT_TOP_REQUEST:
      return {
        ...state,
        isLoadingTop: false,
        success: false,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case PRODUCT_DETAIL_SUCCESS:
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
        success: true,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        product: action.payload,
        products: state.products.map((product) => (product._id === action.payload._id ? action.payload : product)),
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: state.products.filter((product) => product._id !== action.payload._id),
      };
    case PRODUCT_TOP_SUCCESS:
      return {
        ...state,
        isLoadingTop: false,
        productsTop: action.payload,
      };
    case PRODUCT_LIST_FAIL:
    case PRODUCT_DETAIL_FAIL:
    case PRODUCT_DELETE_FAIL:
    case PRODUCT_UPDATE_FAIL:
    case PRODUCT_CREATE_FAIL:
    case PRODUCT_CREATE_REVIEW_FAIL:
    case PRODUCT_TOP_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoadingTop: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default productReducer;
