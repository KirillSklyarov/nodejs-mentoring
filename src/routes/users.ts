import 'reflect-metadata';
import express, { json, NextFunction, Response } from 'express';
import { createUserValidator } from '../validators/users/createUserValidator';
import { updateUserValidator } from '../validators/users/updateUserValidator';
import { uuidValidator } from '../validators/uuidValidator';
import { autoSuggestUserValidator } from '../validators/users/autoSuggestValidator';
import { UserController } from '../controllers/UserController';
import { Container } from 'typedi';
import { ValidatedRequest } from 'express-joi-validation';
import { UpdateUserSchema } from '../schemas/users/UpdateUserSchema';
import { CreateUserSchema } from '../schemas/users/CreateUserSchema';
import { EntityUuidSchema } from '../schemas/EntityUuidSchema';
import { AutoSuggestUserSchema } from '../schemas/users/AutoSuggestUserSchema';

export const userRouter = express.Router();

const userController: UserController = Container.get(UserController);

userRouter.get(`/:uuid`,
  uuidValidator,
  (request: ValidatedRequest<EntityUuidSchema>, response: Response, next: NextFunction) => {
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
  (request: ValidatedRequest<AutoSuggestUserSchema>, response: Response, next: NextFunction) => {
    userController.findByMask(request, response, next);
  },
);
userRouter.patch('/:uuid', json(), uuidValidator, updateUserValidator,
  (request: ValidatedRequest<UpdateUserSchema>, response: Response, next: NextFunction) => {
    userController.update(request, response, next);
  });
userRouter.delete('/:uuid', uuidValidator,
  (request: ValidatedRequest<EntityUuidSchema>, response: Response, next: NextFunction) => {
    userController.delete(request, response, next);
  });
