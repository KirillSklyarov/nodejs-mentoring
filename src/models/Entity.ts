import { Column, DataType, Model } from 'sequelize-typescript';

export type EntityModelAttributes = Pick<Entity, 'id' | 'uuid'>
export type EntityCreationAttributes = Pick<Entity, 'uuid'>

export type EntityDTO = Pick<EntityModelAttributes, 'uuid'>;

export abstract class Entity<TModelAttributes extends {} = EntityModelAttributes, TCreationAttributes extends {} = EntityCreationAttributes> extends Model<TModelAttributes, TCreationAttributes> {
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
}


