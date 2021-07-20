import {
  Table, Column, DataType, BelongsToMany,
} from 'sequelize-typescript';
import { Group, GroupModelAttributes, ResponseGroupDTO } from './Group';
import { UserGroup } from './UserGroup';
import { Entity } from './Entity';

export type UserModelAttributes =
  Pick<User, 'id' | 'uuid' | 'login' | 'password' | 'name' | 'age' | 'isDeleted'>
  & { groups: GroupModelAttributes[] };
export type UserCreationAttributes = Pick<User, 'uuid' | 'login' | 'password' | 'name' | 'age'>;

export type CreateUserDTO = Pick<UserModelAttributes, 'login' | 'password' | 'name' | 'age'>;
export type ResponseUserDTO = Pick<UserModelAttributes, 'uuid' | 'login' | 'name' | 'age'>;
export type UpdateUserDTO = Partial<Pick<UserModelAttributes, 'login' | 'name' | 'age'>>;

@Table
export class User extends Entity<UserModelAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.STRING(32),
    unique: true,
  })
  login: string;

  @Column({
    type: DataType.STRING(255),
  })
  password: string;

  @Column({
    type: DataType.STRING(32),
  })
  name: string;

  @Column({
    type: DataType.SMALLINT,
  })
  age: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDeleted: boolean;

  @BelongsToMany(() => Group, () => UserGroup)
  groups: Group[];
}
