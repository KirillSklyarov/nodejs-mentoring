import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { EntityDTO } from '../../models/Entity';
import { UpdateUserDTO } from '../../models/User';

export interface UpdateUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: EntityDTO,
  [ContainerTypes.Body]: UpdateUserDTO,
}
