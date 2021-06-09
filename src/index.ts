import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './routes/user';
import { DatabaseService } from './services/database.service';
import { Container } from 'typedi';
import { JoiErrorHandler } from './errorHandlers/JoiErrorHandler';
import { ExpressJoiError } from 'express-joi-validation';
import { ApplicationError } from './models/application-error';
import { AppErrorHandler } from './errorHandlers/AppErrorHandler';

const app = express();
const PORT = process.env.PORT || 8000;

const dbService: DatabaseService = Container.get(DatabaseService);
const joiErrorHandler: JoiErrorHandler = Container.get(JoiErrorHandler);
const appErrorHandler: AppErrorHandler = Container.get(AppErrorHandler);
dbService.init();

app.use('/users', userRouter);
app.use((
  err: any | ExpressJoiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => joiErrorHandler.handle(err, req, res, next));
app.use((
  err: any | ApplicationError,
  req: Request,
  res: Response,
  next: NextFunction,
) => appErrorHandler.handle(err, req, res, next));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
