import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { UpdateUserDTO, UuidDTO } from '../models/UserDTO';

export interface UpdateUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UpdateUserDTO,
  [ContainerTypes.Params]: UuidDTO,
}
