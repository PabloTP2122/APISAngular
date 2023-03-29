export interface User {
  id: string;
  name: string;
  email: string;
  password: number;
}

export interface CreateUserDTO extends Omit<User, 'id'> {
}
