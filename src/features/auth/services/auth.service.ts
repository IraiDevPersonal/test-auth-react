import { userStoreApi } from "@/config/apis/user-store.api";
import { HttpClient } from "@/config/http-client";
import { BrowserStorage } from "@/config/browser-storage";
import { UserEntity } from "../entities/user.entity";
import { AuthLoginPayload } from "../models/auth.model";

export class AuthService {
  constructor(
    private readonly storage: BrowserStorage,
    private readonly httpClient: HttpClient
  ) {}

  public async loginUser(payload: AuthLoginPayload) {
    try {
      const { data } = await userStoreApi.post("/auth/login", payload);
      const result = this.authResponseAdapater(data);
      this.storage.saveInStorage(result.token);
      return result.user;
    } catch (error) {
      throw new Error(this.httpClient.getErrorMessage(error));
    }
  }

  public async renewUser() {
    try {
      this.httpClient.appendAuthorizationToken(userStoreApi);
      const { data } = await userStoreApi.get("/auth/renew");

      // throw new Error("Error en validacion de sesion");

      const { token: newToken, user } = this.authResponseAdapater(data);
      this.storage.saveInStorage(newToken);
      return user;
    } catch (error) {
      this.storage.removeFormStorage();
      throw new Error(this.httpClient.getErrorMessage(error));
    }
  }

  public async logoutUser() {
    try {
      this.httpClient.appendAuthorizationToken(userStoreApi);
      const { data } = await userStoreApi.get("/auth/logout");
      this.storage.removeFormStorage();
      return data.message as string;
    } catch (error) {
      throw new Error(this.httpClient.getErrorMessage(error));
    }
  }

  // PRIVATE METHODS

  private authResponseAdapater(data: Record<string, any>) {
    const { user, token } = data;

    return {
      user: UserEntity.fromObject(user),
      token: token as string,
    };
  }
}
