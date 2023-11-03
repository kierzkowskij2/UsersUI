import { TokenResponse } from "./token-response.model";

export interface Data {
  authorized: boolean;
  tokenResponse: TokenResponse;
}