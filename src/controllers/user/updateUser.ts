import { ValidatedRequest } from 'express-joi-validation';
import { Response } from 'express';
import { UpdateUserSchema } from '../../middlewares/updateUserValidator';
import { updateUserInDB } from '../../repositories/user';
import { ApplicationError } from '../../models/application-error';

export function updateUser(request: ValidatedRequest<UpdateUserSchema>, response: Response) {
  const { id } = request.params;
  const user = request.body;
  try {
    updateUserInDB(id, user);
    response.json({ id });
  } catch (e) {
    switch (e.message) {
      case 'not found':
        throw new ApplicationError(`user ${id} not found`, 404);
      case 'conflict':
        throw new ApplicationError(`login ${user} is already exist`, 409);
      default:
        throw new ApplicationError('database error', 500);
    }
  }
}
