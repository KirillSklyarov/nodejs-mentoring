import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from '../models/application-error';

export function appErrorHandler(err: any|ApplicationError, req: Request, res: Response, next: NextFunction) {
  if (err && err.code) {
    res.status(err.code).json({
      message: err.toString(),
    });
  } else {
    next(err);
  }
}
