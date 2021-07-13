import "reflect-metadata";
import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import { LOGGER_TOKEN } from '../tokens/LOGGER_TOKEN';

export function ExceptionCatcher(): MethodDecorator {
  return function <T>(target: Object,
                      propertyKey: string | symbol,
                      descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<T> {
    const originalMethod = descriptor.value;

    descriptor.value = async function (request: Request, response: Response, next: NextFunction): Promise<void> {
      let result;
      try {
        result = await originalMethod.apply(this, [request, response, next]);
        return result;
      } catch (error) {
        const logger: Logger = Container.get(LOGGER_TOKEN);
        logger.error(error.message);
        next(error);
      }
    }

    return descriptor;
  };
}
