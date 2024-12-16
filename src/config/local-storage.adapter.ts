export class LocalStorageAdapter {
  constructor(public readonly key: string) {}

  private localStorage = window.localStorage;

  public saveInStorage<T>(value: T) {
    const parseValue =
      typeof value === "string" ? value : JSON.stringify(value);
    this.localStorage.setItem(this.key, parseValue);
  }

  public getFromStorage<T>() {
    const result = this.localStorage.getItem(this.key) ?? "";
    try {
      return JSON.parse(result) as T;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return result as T;
    }
  }

  public removeFormStorage() {
    this.localStorage.removeItem(this.key);
  }

  public hasToken() {
    return !!this.getFromStorage();
  }
}
