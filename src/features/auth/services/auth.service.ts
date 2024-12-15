import { userStoreApi } from "@/config/apis/user-store.api";
import axios from "axios";
import { UserEntity } from "../entities/user.entity";
import { LocalStorageAdapter } from "@/config/local-storage.adapter";

export interface LoginUserPayload {
  email: string;
  password: string;
}

export class AuthService {
  constructor(private readonly localStorage: LocalStorageAdapter) {}

  public async loginUser(payload: LoginUserPayload) {
    try {
      const { data } = await userStoreApi.post("/auth/login", payload);
      const result = this.authResponseAdapater(data);
      this.localStorage.saveInStorage(result.token as string);
      return result.user;
    } catch (error) {
      throw new Error(this.handleError(error));
    }
  }

  public async renewUser() {
    try {
      const token = this.localStorage.getFromStorage();

      if (!token) {
        return null;
      }

      const { data } = await userStoreApi.get("/auth/renew", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // throw new Error("Error en validacion de sesion");

      const { token: newToken, user } = this.authResponseAdapater(data);
      this.localStorage.saveInStorage(newToken as string);
      return user;
    } catch (error) {
      this.localStorage.removeFormStorage();
      const errorMessage = this.handleError(error);
      console.log(errorMessage);
      // throw new Error(errorMessage);
      return null;
    }
  }

  private authResponseAdapater(data: Record<string, any>) {
    const { user, token } = data;

    return {
      user: UserEntity.fromObject(user),
      token: token,
    };
  }

  private handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      return `${error.message}`;
    }

    return `${error}`;
  }
}
