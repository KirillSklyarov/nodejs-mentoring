import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import { Permission, permissions } from '../../models/Permission';

const validator = createValidator({
  passError: true,
});

const createGroupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.string().valid(...permissions)).required(),
});

export const createGroupValidator = validator.body(createGroupSchema);
