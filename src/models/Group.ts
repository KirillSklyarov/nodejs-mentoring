import { Table, Column, DataType, BelongsToMany } from 'sequelize-typescript'
import { Permission } from './Permission';
import { User, UserModelAttributes } from './User';
import { UserGroup } from './UserGroup';
import { Entity, EntityDTO } from './Entity';

export type GroupModelAttributes = Pick<Group, 'id' | 'uuid' | 'name' | 'permissions'> & { users: UserModelAttributes[] };
export type GroupCreationAttributes = Pick<Group, 'uuid' | 'name' | 'permissions'>;

export type CreateGroupDTO = Pick<GroupModelAttributes, 'name' | 'permissions'>;
export type ResponseGroupDTO = Pick<GroupModelAttributes, 'uuid' | 'name' | 'permissions'> & Partial<{ users: EntityDTO[]}>;
export type UpdateGroupDTO = Partial<Pick<GroupModelAttributes, 'name' | 'permissions'>>;

@Table
export class Group extends Entity<GroupModelAttributes, GroupCreationAttributes> {
  @Column({
    type: DataType.STRING(32),
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING(12)),
  })
  permissions: Permission[];

  @BelongsToMany(() => User, () => UserGroup)
  users: User[];
}
