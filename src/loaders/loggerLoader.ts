import winston, { Logger } from 'winston';
import { Container } from 'typedi';
import { LOGGER_TOKEN } from '../tokens/LOGGER_TOKEN';

export function loggerLoader(): void {
  const logger: Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.File({
        filename: 'info.log',
      }),
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
      }),
    ],
  });
  Container.set(LOGGER_TOKEN, logger);
}
