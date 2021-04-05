import * as Joi from 'joi';
import { ContainerTypes, createValidator, ValidatedRequestSchema } from 'express-joi-validation';

const validator = createValidator({
  passError: true,
});

const updateUserSchema = Joi.object({
  login: Joi.string().required(),
  age: Joi.number().integer().min(4).max(130),
});

export interface UpdateUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string,
    age: number,
  },
  [ContainerTypes.Params]: {
    id: string,
  },
}

export const updateUserValidator = validator.body(updateUserSchema);
