import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { CreateUserDTO } from '../models/UserDTO';

export interface CreateUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateUserDTO,
}
