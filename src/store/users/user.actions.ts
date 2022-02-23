import { Dispatch } from "redux";
import api from "api";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_CURRENT_REQUEST,
  USER_CURRENT_SUCCESS,
  USER_CURRENT_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAIL,
  UserDispatchTypes,
} from "store/users/user.types";
import {
  IAuthResponse,
  IUserResponse,
  IUsersResponse,
} from "store/users/interfaces/user.interface";
import { SignInDto, SignUpDto } from "store/users/dtos/user.dtos";

export const signIn =
  (signInDto: SignInDto) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    dispatch({
      type: USER_SIGNIN_REQUEST,
    });
    try {
      const {
        data: { user, token, token_refresh },
      } = await api.post<IAuthResponse>("/auth/signin", signInDto);
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: user,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("token_refresh", token_refresh);
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signUp =
  (signUpDto: SignUpDto) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    });
    try {
      const {
        data: { user, token, token_refresh },
      } = await api.post<IAuthResponse>("/auth/signup", signUpDto);
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: user,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("token_refresh", token_refresh);
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUserProfile =
  (userData: SignUpDto) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });
    try {
      const {
        data: { user },
      } = await api.put<IUserResponse>("/user", userData);
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: { user, message: "Profile updated" },
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCurrentUser =
  () => async (dispatch: Dispatch<UserDispatchTypes>) => {
    dispatch({
      type: USER_CURRENT_REQUEST,
    });

    try {
      const {
        data: { user },
      } = await api.get<IUserResponse>("/auth/user");
      dispatch({
        type: USER_CURRENT_SUCCESS,
        payload: user,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: USER_CURRENT_FAIL,
        payload: "",
      });
    }
  };

export const getAllUsers =
  () => async (dispatch: Dispatch<UserDispatchTypes>) => {
    dispatch({
      type: USER_LIST_REQUEST,
    });
    try {
      const {
        data: { users },
      } = await api.get<IUsersResponse>("/user");
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: users,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUserById =
  (id: string) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    console.log(id);
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    try {
      const {
        data: { user },
      } = await api.delete<IUserResponse>(`/user/${id}`);
      dispatch({
        type: USER_DELETE_SUCCESS,
        payload: user,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserById =
  (id: string) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    try {
      const {
        data: { user },
      } = await api.get<IUserResponse>(`/user/${id}`);
      // console.log(user);
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: user,
      });
    } catch (error: any) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUserById =
  (id: string, data: any) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    dispatch({
      type: USER_UPDATE_DETAILS_REQUEST,
    });
    try {
      const {
        data: { user },
      } = await api.put<IUserResponse>(`/user/${id}`, data);
      console.log(user);
      dispatch({
        type: USER_UPDATE_DETAILS_SUCCESS,
        payload: user,
      });
    } catch (error: any) {
      dispatch({
        type: USER_UPDATE_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const signOut = () => async (dispatch: Dispatch<UserDispatchTypes>) => {
  dispatch({ type: USER_SIGNOUT });
  localStorage.removeItem("token");
  localStorage.removeItem("token_refresh");
};
