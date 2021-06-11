import 'reflect-metadata';
import express, { json, NextFunction, Request, Response } from 'express';
import { createUserValidator } from '../validators/createUserValidator';
import { updateUserValidator } from '../validators/updateUserValidator';
import { uuidValidator } from '../validators/uuidValidator';
import { autoSuggestUserValidator } from '../validators/autoSuggestValidator';
import { UserController } from '../controllers/UserController';
import { Container } from 'typedi';
import { ValidatedRequest } from 'express-joi-validation';
import { UpdateUserSchema } from '../schemas/UpdateUserSchema';
import { CreateUserSchema } from '../schemas/CreateUserSchema';
import { DeleteUserSchema } from '../schemas/DeleteUserSchema';

export const userRouter = express.Router();

const userController: UserController = Container.get(UserController);

userRouter.get(`/:uuid`,
  uuidValidator,
  (request: Request, response: Response, next: NextFunction) => {
    userController.get(request, response, next);
  },
);
userRouter.post('', json(),
  createUserValidator,
  (request: ValidatedRequest<CreateUserSchema>, response: Response, next: NextFunction) => {
    userController.create(request, response, next);
  },
);
userRouter.get('',
  autoSuggestUserValidator,
  (request: ValidatedRequest<CreateUserSchema>, response: Response, next: NextFunction) => {
    userController.findByMask(request, response, next);
  },
);
userRouter.patch('/:uuid', json(), uuidValidator, updateUserValidator,
  (request: ValidatedRequest<UpdateUserSchema>, response: Response, next: NextFunction) => {
    userController.update(request, response, next);
  });
userRouter.delete('/:uuid', uuidValidator,
  (request: ValidatedRequest<DeleteUserSchema>, response: Response, next: NextFunction) => {
    userController.delete(request, response, next);
  });
