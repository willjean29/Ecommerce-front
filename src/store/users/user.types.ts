import { User } from "store/users/interfaces/user.interface";
export const USER_SIGNIN_REQUEST = "USER_SIGNIN_REQUEST";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_FAIL = "USER_SIGNIN_FAIL";

export const USER_SIGNOUT = "USER_SIGNOUT";

export const USER_SIGNUP_REQUEST = "USER_SIGNUP_REQUEST";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAIL = "USER_SIGNUP_FAIL";

export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_FAIL = "USER_UPDATE_FAIL";

export const USER_CURRENT_REQUEST = "USER_CURRENT_REQUEST";
export const USER_CURRENT_SUCCESS = "USER_CURRENT_SUCCESS";
export const USER_CURRENT_FAIL = "USER_CURRENT_FAIL";

export const USER_LIST_REQUEST = "USER_LIST_REQUEST";
export const USER_LIST_SUCCESS = "USER_LIST_SUCCESS";
export const USER_LIST_FAIL = "USER_LIST_FAIL";

export const USER_DELETE_REQUEST = "USER_DELETE_REQUEST";
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
export const USER_DELETE_FAIL = "USER_DELETE_FAIL";

export const USER_DETAILS_REQUEST = "USER_DETAILS_REQUEST";
export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS";
export const USER_DETAILS_FAIL = "USER_DETAILS_FAIL";

export const USER_UPDATE_DETAILS_REQUEST = "USER_UPDATE_DETAILS_REQUEST";
export const USER_UPDATE_DETAILS_SUCCESS = "USER_UPDATE_DETAILS_SUCCESS";
export const USER_UPDATE_DETAILS_FAIL = "USER_UPDATE_DETAILS_FAIL";

export const USER_STATE_RESET = "USER_STATE_RESET";

export interface UserSigninRequest {
  type: typeof USER_SIGNIN_REQUEST;
}
export interface UserSigninSuccess {
  type: typeof USER_SIGNIN_SUCCESS;
  payload: User;
}
export interface UserSigninFail {
  type: typeof USER_SIGNIN_FAIL;
  payload: string;
}

export interface UserSignout {
  type: typeof USER_SIGNOUT;
}

export interface UserSignupRequest {
  type: typeof USER_SIGNUP_REQUEST;
}
export interface UserSignupSuccess {
  type: typeof USER_SIGNUP_SUCCESS;
  payload: User;
}
export interface UserSignupFail {
  type: typeof USER_SIGNUP_FAIL;
  payload: string;
}

export interface UserUpdateRequest {
  type: typeof USER_UPDATE_REQUEST;
}
export interface UserUpdateSuccess {
  type: typeof USER_UPDATE_SUCCESS;
  payload: { user: User; message: string };
}
export interface UserUpdateFail {
  type: typeof USER_UPDATE_FAIL;
  payload: string;
}

export interface UserCurrentRequest {
  type: typeof USER_CURRENT_REQUEST;
}
export interface UserCurrentSuccess {
  type: typeof USER_CURRENT_SUCCESS;
  payload: User;
}
export interface UserCurrentFail {
  type: typeof USER_CURRENT_FAIL;
  payload: string;
}

export interface UserListRequest {
  type: typeof USER_LIST_REQUEST;
}
export interface UserListSuccess {
  type: typeof USER_LIST_SUCCESS;
  payload: User[];
}
export interface UserListFail {
  type: typeof USER_LIST_FAIL;
  payload: string;
}

export interface UserDeleteRequest {
  type: typeof USER_DELETE_REQUEST;
}
export interface UserDeleteSuccess {
  type: typeof USER_DELETE_SUCCESS;
  payload: User;
}
export interface UserDeleteFail {
  type: typeof USER_DELETE_FAIL;
  payload: string;
}

export interface UserDetailsRequest {
  type: typeof USER_DETAILS_REQUEST;
}
export interface UserDetailsSuccess {
  type: typeof USER_DETAILS_SUCCESS;
  payload: User;
}
export interface UserDetailsFail {
  type: typeof USER_DETAILS_FAIL;
  payload: string;
}

export interface UserUpdateDetailsRequest {
  type: typeof USER_UPDATE_DETAILS_REQUEST;
}
export interface UserUpdateDetailsSuccess {
  type: typeof USER_UPDATE_DETAILS_SUCCESS;
  payload: User;
}
export interface UserUpdateDetailsFail {
  type: typeof USER_UPDATE_DETAILS_FAIL;
  payload: string;
}

export interface UserStateReset {
  type: typeof USER_STATE_RESET;
}

export type UserDispatchTypes =
  | UserSigninRequest
  | UserSigninSuccess
  | UserSigninFail
  | UserSignupRequest
  | UserSignupSuccess
  | UserSignupFail
  | UserSignout
  | UserUpdateRequest
  | UserUpdateSuccess
  | UserUpdateFail
  | UserCurrentRequest
  | UserCurrentSuccess
  | UserCurrentFail
  | UserListRequest
  | UserListSuccess
  | UserListFail
  | UserDeleteRequest
  | UserDeleteSuccess
  | UserDeleteFail
  | UserDetailsRequest
  | UserDetailsSuccess
  | UserDetailsFail
  | UserUpdateDetailsRequest
  | UserUpdateDetailsSuccess
  | UserUpdateDetailsFail
  | UserStateReset;
