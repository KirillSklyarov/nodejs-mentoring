import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './routes/users';
import { DatabaseService } from './services/database.service';
import { Container } from 'typedi';
import { JoiErrorHandler } from './errorHandlers/JoiErrorHandler';
import { ExpressJoiError } from 'express-joi-validation';
import { ApplicationError } from './models/ApplicationError';
import { AppErrorHandler } from './errorHandlers/AppErrorHandler';
import { groupRouter } from './routes/groups';
import { UniqueErrorHandler } from './errorHandlers/UniqueErrorHandler';

const app = express();
const PORT = process.env.PORT || 8000;

const dbService: DatabaseService = Container.get(DatabaseService);
const joiErrorHandler: JoiErrorHandler = Container.get(JoiErrorHandler);
const uniqueErrorHandler: UniqueErrorHandler = Container.get(UniqueErrorHandler);
const appErrorHandler: AppErrorHandler = Container.get(AppErrorHandler);
dbService.init();

app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use((
  err: any | ExpressJoiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => joiErrorHandler.handle(err, req, res, next));
app.use((
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => uniqueErrorHandler.handle(err, req, res, next));
app.use((
  err: any | ApplicationError,
  req: Request,
  res: Response,
  next: NextFunction,
) => appErrorHandler.handle(err, req, res, next));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
