import { Dispatch } from "redux";
import api from "api";
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
import { IProductDetailResponse, IProductResponse } from "store/products/interfaces/product.interface";

export const listProducts =
  (keyword: string = "", pageNumner: string = "1") =>
  async (dispatch: Dispatch<ProductDispatchTypes>) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const {
        data: { products, page, pages },
      } = await api.get<IProductResponse>(`/products?keyword=${keyword}&pageNumber=${pageNumner}`);
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: {
          products,
          page: page as number,
          pages: pages as number,
        },
      });
    } catch (error: any) {
      console.log(error.response);
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

export const listProductDetail = (id: string) => async (dispatch: Dispatch<ProductDispatchTypes>) => {
  dispatch({
    type: PRODUCT_DETAIL_REQUEST,
  });
  try {
    const response = await api.get<IProductDetailResponse>(`/products/${id}`);
    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: response.data.product,
    });
  } catch (error: any) {
    console.log(error.response);
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteProductById = (id: string) => async (dispatch: Dispatch<ProductDispatchTypes>) => {
  dispatch({
    type: PRODUCT_DELETE_REQUEST,
  });
  try {
    const {
      data: { product },
    } = await api.delete<IProductDetailResponse>(`/products/${id}`);
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: product,
    });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateProductById = (id: string, data: any) => async (dispatch: Dispatch<ProductDispatchTypes>) => {
  dispatch({
    type: PRODUCT_UPDATE_REQUEST,
  });
  try {
    const {
      data: { product },
    } = await api.put<IProductDetailResponse>(`/products/${id}`, data);
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: product,
    });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const craeteProduct = () => async (dispatch: Dispatch<ProductDispatchTypes>) => {
  dispatch({
    type: PRODUCT_CREATE_REQUEST,
  });
  try {
    const {
      data: { product },
    } = await api.post<IProductDetailResponse>("/products/");
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: product,
    });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createProductReview = (id: string, reviewDto: any) => async (dispatch: Dispatch<ProductDispatchTypes>) => {
  dispatch({
    type: PRODUCT_CREATE_REVIEW_REQUEST,
  });
  try {
    const {
      data: { product },
    } = await api.post<IProductDetailResponse>(`/products/${id}/review`, reviewDto);
    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
      payload: product,
    });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getTopProducts = () => async (dispatch: Dispatch<ProductDispatchTypes>) => {
  dispatch({
    type: PRODUCT_TOP_REQUEST,
  });
  try {
    const {
      data: { products },
    } = await api.get<IProductResponse>("products/top");
    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: products,
    });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
