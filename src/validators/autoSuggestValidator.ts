import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator({
  passError: true,
});

const autoSuggestSchema = Joi.object({
  loginSubstring: Joi.string().required(),
  limit: Joi.number().integer().min(1),
});

export const autoSuggestUserValidator = validator.query(autoSuggestSchema);
