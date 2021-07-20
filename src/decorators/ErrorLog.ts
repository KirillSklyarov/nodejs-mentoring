import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import { LOGGER_TOKEN } from '../tokens/LOGGER_TOKEN';
import { RequestHelper } from '../helpers/RequestHelper';

export function ErrorLog(): MethodDecorator {
  return function <T> (target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<T> {
    const originalMethod = descriptor.value;

    descriptor.value = async function (request: Request, response: Response, next: NextFunction): Promise<void> {
      const requestHelper: RequestHelper = Container.get(RequestHelper);
      const newNext = (error: Error) => {
        const logger: Logger = Container.get(LOGGER_TOKEN);
        logger.error({
          method: `${target.constructor.name}.${propertyKey.toString()}`,
          arguments: requestHelper.copy(request),
          error: error.message,
        });
        next(error);
      };

      return await originalMethod.apply(this, [request, response, newNext]);
    };

    return descriptor;
  };
}
