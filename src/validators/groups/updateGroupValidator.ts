import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import { permissions } from '../../models/Permission';

const validator = createValidator({
  passError: true,
});

const updateGroupSchema = Joi.object({
  name: Joi.string(),
  permissions: Joi.array().items(Joi.string().valid(...permissions)),
});

export const updateGroupValidator = validator.body(updateGroupSchema);
