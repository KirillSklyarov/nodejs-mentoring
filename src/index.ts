import 'reflect-metadata';
import express, {
  json, NextFunction, Request, Response,
} from 'express';
import { Container } from 'typedi';
import { ExpressJoiError } from 'express-joi-validation';
import { Logger } from 'winston';
import { userRouter } from './routes/users';
import { JoiErrorHandler } from './errorHandlers/JoiErrorHandler';
import { ApplicationError } from './models/ApplicationError';
import { AppErrorHandler } from './errorHandlers/AppErrorHandler';
import { groupRouter } from './routes/groups';
import { UniqueErrorHandler } from './errorHandlers/UniqueErrorHandler';
import { loggerLoader } from './loaders/loggerLoader';
import { databaseLoader } from './loaders/databaseLoader';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { LOGGER_TOKEN } from './tokens/LOGGER_TOKEN';

const app = express();
const PORT = process.env.PORT || 8000;

loggerLoader();
databaseLoader();
const joiErrorHandler: JoiErrorHandler = Container.get(JoiErrorHandler);
const uniqueErrorHandler: UniqueErrorHandler = Container.get(UniqueErrorHandler);
const appErrorHandler: AppErrorHandler = Container.get(AppErrorHandler);
const loggerMiddleware: LoggerMiddleware = Container.get(LoggerMiddleware);
const logger: Logger = Container.get(LOGGER_TOKEN);

process.on('uncaughtException', (error) => {
  logger.error({
    type: 'uncaughtException',
    error: error.message,
  });
});

process.on('unhandledRejection', (error) => {
  logger.error({
    type: 'unhandledRejection',
    error,
  });
});

app.use(json())
  .use((request: Request, response: Response, next: NextFunction) => loggerMiddleware.handle(request, response, next))
  .use('/users', userRouter)
  .use('/groups', groupRouter)
  .use((
    err: any | ExpressJoiError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => joiErrorHandler.handle(err, req, res, next))
  .use((
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => uniqueErrorHandler.handle(err, req, res, next))
  .use((
    err: any | ApplicationError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => appErrorHandler.handle(err, req, res, next));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
