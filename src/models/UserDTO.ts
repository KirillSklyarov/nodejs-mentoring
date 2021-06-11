export interface UserDTO {
  uuid: string;
  login: string;
  name: string;
  age: number;
  password: string;
}

export type CreateUserDTO =  Pick<UserDTO, 'login' | 'password' | 'name' | 'age'>;
export type ResponseUserDTO =  Pick<UserDTO, 'uuid' | 'login' | 'name' | 'age'>;
export type UpdateUserDTO =  Partial<Pick<UserDTO, 'login' | 'name' | 'age'>>;
export type UuidDTO = Pick<UserDTO, 'uuid'>;
