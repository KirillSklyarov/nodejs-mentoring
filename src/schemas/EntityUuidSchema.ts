import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { EntityDTO } from '../models/Entity';

export interface EntityUuidSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: EntityDTO,
}
