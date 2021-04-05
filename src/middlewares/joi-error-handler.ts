import { ExpressJoiError } from 'express-joi-validation';
import { NextFunction, Request, Response } from 'express';

export function joiErrorHandler(err: any|ExpressJoiError, req: Request, res: Response, next: NextFunction) {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      message: err.error.toString(),
    });
  } else {
    next(err);
  }
}
