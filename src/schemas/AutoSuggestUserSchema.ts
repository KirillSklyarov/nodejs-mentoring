import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export interface AutoSuggestUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    loginSubstring: string,
    limit: number,
  },
}
