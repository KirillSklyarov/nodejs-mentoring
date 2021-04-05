import { ValidatedRequest } from 'express-joi-validation';
import { Response } from 'express';
import { CreateUserSchema } from '../../middlewares/createUserValidator';
import { CreateUser } from '../../models/CreateUser';
import { createUserInDB } from '../../repositories/user';
import { ApplicationError } from '../../models/application-error';

export function createUser(request: ValidatedRequest<CreateUserSchema>, response: Response) {
  const newUser: CreateUser = {
    login: request.body.login,
    password: request.body.password,
    age: request.body.age,
  };

  let id: string;
  try {
    id = createUserInDB(newUser);
  } catch (e) {
    throw new ApplicationError(`login ${newUser.login}  is already exists`, 409);
  }
  response.json({ id });
}
