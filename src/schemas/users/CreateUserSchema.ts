import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { CreateUserDTO } from '../../models/User';

export interface CreateUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateUserDTO,
}
