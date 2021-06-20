import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { EntityDTO } from '../../models/Entity';
import { UpdateGroupDTO } from '../../models/Group';

export interface UpdateGroupSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UpdateGroupDTO,
  [ContainerTypes.Params]: EntityDTO,
}
