import { Service } from 'typedi';
import { ExpressJoiError } from 'express-joi-validation';
import { NextFunction, Request, Response } from 'express';

@Service()
export class JoiErrorHandler {
  handle(
    err: any | ExpressJoiError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (err && err.error && err.error.isJoi) {
      res.status(400).json({
        message: err.error.toString(),
      });
    } else {
      next(err);
    }
  }
}
