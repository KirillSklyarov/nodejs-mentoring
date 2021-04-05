import { ValidatedRequest } from 'express-joi-validation';
import { Response } from 'express';
import { AutoSuggestUserSchema } from '../../middlewares/autoSuggestValidator';
import { UserDTO } from '../../models/UserDTO';
import { findUsers } from '../../repositories/user';

export function getAutoSuggestUsers(
  request: ValidatedRequest<AutoSuggestUserSchema>,
  response: Response,
) {
  const userList: UserDTO[] = findUsers(request.query.loginSubstring, request.query.limit);
  response.json(userList);
}
