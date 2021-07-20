import { Container, Inject, Service } from 'typedi';
import { Logger } from 'winston';
import { NextFunction, Request, Response } from 'express';
import { LOGGER_TOKEN } from '../tokens/LOGGER_TOKEN';
import { RequestHelper } from '../helpers/RequestHelper';

@Service()
export class LoggerMiddleware {
  @Inject()
  private requestHelper: RequestHelper;

  handle(request: Request, response: Response, next: NextFunction): void {
    const logger: Logger = Container.get(LOGGER_TOKEN);
    logger.info({
      arguments: this.requestHelper.copy(request),
    });

    next();
  }
}
