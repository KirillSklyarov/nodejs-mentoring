import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator({
  passError: true,
});

const createUserSchema = Joi.object({
  name: Joi.string().required(),
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

export const createUserValidator = validator.body(createUserSchema);
