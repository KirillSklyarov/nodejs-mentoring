import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { CreateGroupDTO } from '../../models/Group';

export interface CreateGroupSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateGroupDTO,
}
