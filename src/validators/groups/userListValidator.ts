import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import { permissions } from '../../models/Permission';

const validator = createValidator({
  passError: true,
});

const userListSchema = Joi.object({
  users: Joi.array().items(Joi.string().uuid()).min(1).required(),
});

export const userListValidator = validator.body(userListSchema);
