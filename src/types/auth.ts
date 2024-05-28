export interface AuthUserRequest {
  email: string;
  password: string;
}

export interface AuthUserResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  isAuth: boolean;
}
