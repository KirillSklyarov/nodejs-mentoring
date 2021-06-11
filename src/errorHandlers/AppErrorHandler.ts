import { Service } from 'typedi';
import { ExpressJoiError } from 'express-joi-validation';
import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from '../models/application-error';

@Service()
export class AppErrorHandler {
  handle(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err && err.code) {
      res.status(err.code).json({
        error: {
          message: err.toString(),
        },
      });
    } else {
      res.status(500).json({
        error: {
          message: 'Internal Server Error',
        },
      });
    }
  }
}
