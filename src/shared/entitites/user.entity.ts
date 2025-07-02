export interface UserPrimitive {
  id?: number;
  username: string;
  email: string;
  rut?: string | null;
  name?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserEntity implements UserPrimitive {
  id?: number;
  username: string;
  name?: string | null;
  email: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: UserPrimitive) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.createdAt = data.createdAt || new Date();
  }

  toPrimitive(): UserPrimitive {
    return {
      id: this.id,
      username: this.username,
      name: this.name,
      email: this.email,
    };
  }
}
