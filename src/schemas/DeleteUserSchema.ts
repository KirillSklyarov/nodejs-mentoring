import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { UserDTO, UuidDTO } from '../models/UserDTO';

export interface DeleteUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: UuidDTO,
}
