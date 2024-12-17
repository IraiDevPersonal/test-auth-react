type StorageType = "local-storage" | "session-storage";

export class BrowserStorage {
  constructor(
    public readonly key: string,
    private readonly storageType: StorageType = "local-storage"
  ) {}

  private storage =
    this.storageType === "local-storage"
      ? window.localStorage
      : window.sessionStorage;

  public saveInStorage<T>(value: T) {
    const parseValue =
      typeof value === "string" ? value : JSON.stringify(value);
    this.storage.setItem(this.key, parseValue);
  }

  public getFromStorage<T>() {
    const result = this.storage.getItem(this.key) ?? "";
    try {
      return JSON.parse(result) as T;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return result as T;
    }
  }

  public removeFormStorage() {
    this.storage.removeItem(this.key);
  }

  public hasToken() {
    return !!this.getFromStorage();
  }
}
