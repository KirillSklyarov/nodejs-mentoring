import {
  Column, ForeignKey, Model, Table,
} from 'sequelize-typescript';
import { User } from './User';
import { Group } from './Group';

@Table
export class UserGroup extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number

  @ForeignKey(() => Group)
  @Column
  groupId: number
}
