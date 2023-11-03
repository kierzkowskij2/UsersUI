import { Data } from "./data.model";

export interface LoginResponse {
    success: boolean;
    data: Data;
    message: string | undefined;
  }
