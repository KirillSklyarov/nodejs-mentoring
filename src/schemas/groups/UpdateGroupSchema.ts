import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { EntityDTO } from '../../models/Entity';
import { UpdateGroupDTO } from '../../models/Group';

export interface UpdateGroupSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: EntityDTO,
  [ContainerTypes.Body]: UpdateGroupDTO,
}
