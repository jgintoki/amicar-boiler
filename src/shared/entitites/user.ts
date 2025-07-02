export interface UserPrimitive {
  id?: number;
  name?: string | null;
  email: string;
  password?: string;
  createdAt?: Date;
}

export class UserEntity implements UserPrimitive {
  id?: number;
  name?: string | null;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: UserPrimitive) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.createdAt = data.createdAt || new Date();
  }

  toPrimitive(): UserPrimitive {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
    };
  }
}
