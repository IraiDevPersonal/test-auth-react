import { userStoreApi } from "@/config/apis/user-store.api";
import { HttpClient } from "@/config/http-client";
import { LocalStorageAdapter } from "@/config/local-storage.adapter";
import { UserEntity } from "../entities/user.entity";

export interface LoginUserPayload {
  email: string;
  password: string;
}

export class AuthService {
  constructor(
    private readonly localStorage: LocalStorageAdapter,
    private readonly httpClient: HttpClient
  ) {}

  public async loginUser(payload: LoginUserPayload) {
    try {
      const { data } = await userStoreApi.post("/auth/login", payload);
      const result = this.authResponseAdapater(data);
      this.localStorage.saveInStorage(result.token);
      return result.user;
    } catch (error) {
      throw new Error(this.httpClient.handleError(error));
    }
  }

  public async renewUser() {
    try {
      this.httpClient.appendAuthorizationToken(userStoreApi);
      const { data } = await userStoreApi.get("/auth/renew");

      // throw new Error("Error en validacion de sesion");

      const { token: newToken, user } = this.authResponseAdapater(data);
      this.localStorage.saveInStorage(newToken);
      return user;
    } catch (error) {
      this.localStorage.removeFormStorage();
      throw new Error(this.httpClient.handleError(error));
    }
  }

  private authResponseAdapater(data: Record<string, any>) {
    const { user, token } = data;

    return {
      user: UserEntity.fromObject(user),
      token: token as string,
    };
  }
}
