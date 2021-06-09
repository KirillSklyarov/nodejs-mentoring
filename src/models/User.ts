import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.UUID,
    unique: true,
  })
  uuid: string;

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
  isDeleted: false;
}
