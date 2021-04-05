import * as Joi from 'joi';
import { ContainerTypes, createValidator, ValidatedRequestSchema } from 'express-joi-validation';
import { CreateUser } from '../models/CreateUser';

const validator = createValidator({
  passError: true,
});

const uuidSchema = Joi.object({
  id: Joi.string().uuid(),
});

export const uuidValidator = validator.params(uuidSchema);
