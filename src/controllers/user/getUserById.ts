import { Request, Response } from 'express';
import { User } from '../../models/User';
import { getByIdFromDB } from '../../repositories/user';
import { ApplicationError } from '../../models/application-error';
import { UserDTO } from '../../models/UserDTO';

export function getUserById(request: Request, response: Response) {
  let user: User;
  try {
    user = getByIdFromDB(request.params.id);
  } catch (e) {
    throw new ApplicationError(e.message, 404);
  }

  if (user.isDeleted) {
    throw new ApplicationError(`user ${request.params.id} not found`, 404);
  }

  const userDTO: UserDTO = {
    id: user.id,
    login: user.login,
    age: user.age,
  };

  response.json(userDTO);
}
