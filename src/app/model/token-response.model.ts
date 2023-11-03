import { User } from "./user.model";

export interface TokenResponse {
  expiration: any;
  refreshToken: string;
  token: string;
  user: User
}