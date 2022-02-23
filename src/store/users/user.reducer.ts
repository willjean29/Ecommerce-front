import { IUserState } from "store/users/interfaces/userState.interface";
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
  // USER_STATE_RESET,
  UserDispatchTypes,
} from "store/users/user.types";

const userInitialState: IUserState = {
  user: null,
  users: [],
  userDetails: null,
  isLoadingUserDetails: false,
  isLoading: false,
  isLoadingUsers: false,
  isAuthenticated: false,
  errorUser: "",
  message: "",
  error: "",
};

const userReducer = (state: IUserState = userInitialState, action: UserDispatchTypes) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
    case USER_SIGNUP_REQUEST:
    case USER_UPDATE_REQUEST:
    case USER_CURRENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_DELETE_REQUEST:
    case USER_LIST_REQUEST:
    case USER_DETAILS_REQUEST:
    case USER_UPDATE_DETAILS_REQUEST:
      return {
        ...state,
        isLoadingUsers: true,
      };
    case USER_SIGNIN_SUCCESS:
    case USER_SIGNUP_SUCCESS:
    case USER_UPDATE_SUCCESS:
    case USER_CURRENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.type === USER_UPDATE_SUCCESS ? action.payload.user : action.payload,
        message: action.type === USER_UPDATE_SUCCESS ? action.payload.message : "",
      };
    case USER_LIST_SUCCESS:
      return {
        ...state,
        isLoadingUsers: false,
        users: action.payload,
      };
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        isLoadingUsers: false,
        users: state.users.filter((user) => user._id !== action.payload._id),
        userDetails: action.payload,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoadingUsers: false,
        userDetails: action.payload,
      };
    case USER_UPDATE_DETAILS_SUCCESS:
      return {
        ...state,
        isLoadingUsers: false,
        users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user)),
        userDetails: action.payload,
      };
    case USER_SIGNIN_FAIL:
    case USER_SIGNUP_FAIL:
    case USER_CURRENT_FAIL:
    case USER_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case USER_LIST_FAIL:
    case USER_DELETE_FAIL:
    case USER_DETAILS_FAIL:
    case USER_UPDATE_DETAILS_FAIL:
      return {
        ...state,
        isLoadingUsers: false,
        errorUser: action.payload,
      };
    case USER_SIGNOUT:
      return userInitialState;
    default:
      return state;
  }
};

export default userReducer;
