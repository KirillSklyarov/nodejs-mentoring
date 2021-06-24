import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { EntityDTO } from '../../models/Entity';

export interface AddUsersToGroupSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: EntityDTO,
  [ContainerTypes.Body]: {
    users: string[],
  },
}
