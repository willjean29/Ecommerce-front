import { User } from "store/users/interfaces/user.interface";
export interface IUserState {
  user: User | null;
  users: User[];
  userDetails: User | null;
  isLoading: boolean;
  isLoadingUsers: boolean;
  isLoadingUserDetails: boolean;
  isAuthenticated: boolean;
  message: string;
  error: string;
  errorUser: string;
}
