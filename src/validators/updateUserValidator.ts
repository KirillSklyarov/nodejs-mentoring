import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator({
  passError: true,
});

const updateUserSchema = Joi.object({
  login: Joi.string(),
  name: Joi.string(),
  age: Joi.number().integer().min(4).max(130),
});

export const updateUserValidator = validator.body(updateUserSchema);
