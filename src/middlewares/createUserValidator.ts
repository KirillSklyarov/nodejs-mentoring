import * as Joi from 'joi';
import { ContainerTypes, createValidator, ValidatedRequestSchema } from 'express-joi-validation';
import { CreateUser } from '../models/CreateUser';

const validator = createValidator({
  passError: true,
});

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .required()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9]+$/)
    .messages({
      'string.pattern.base': 'Password must contain only numbers letters and contain at least one letter and one number',
    }),
  age: Joi.number().integer().min(4).max(130),
});

export interface CreateUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateUser,
}

export const createUserValidator = validator.body(userSchema);
