export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public emailValidated: boolean,
    public role: string[],
    public img?: string
  ) {}

  static fromObject(object: Record<string, any>) {
    const { id, name, email, emailValidated, role, img } = object;

    if (!id) {
      throw new Error("Missing id");
    }

    if (!name) {
      throw new Error("Missing name");
    }

    if (!email) {
      throw new Error("Missing email");
    }

    if (emailValidated === undefined) {
      throw new Error("Missing emailValidated");
    }

    if (!role) {
      throw new Error("Missing role");
    }

    return new UserEntity(id, name, email, emailValidated, role, img);
  }
}
