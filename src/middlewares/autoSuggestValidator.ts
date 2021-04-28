import * as Joi from 'joi';
import { ContainerTypes, createValidator, ValidatedRequestSchema } from 'express-joi-validation';

const validator = createValidator({
  passError: true,
});

const autoSuggestSchema = Joi.object({
  loginSubstring: Joi.string().required(),
  limit: Joi.number().integer().min(1),
});

export interface AutoSuggestUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    loginSubstring: string,
    limit: number,
  },
}

export const autoSuggestUserValidator = validator.query(autoSuggestSchema);
