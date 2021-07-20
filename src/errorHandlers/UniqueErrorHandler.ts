import { Service } from 'typedi';
import { ExpressJoiError } from 'express-joi-validation';
import { NextFunction, Request, Response } from 'express';
import { UniqueConstraintError, ValidationErrorItem } from 'sequelize';
import { ApplicationError } from '../models/ApplicationError';

@Service()
export class UniqueErrorHandler {
  handle(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err instanceof UniqueConstraintError) {
      const message: string = err.errors.map((error: ValidationErrorItem) => error.message).join('; ');
      next(new ApplicationError(message, 409));
    } else {
      next(err);
    }
  }
}
