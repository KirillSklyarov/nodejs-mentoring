import 'reflect-metadata';
import express, { json, NextFunction, Response } from 'express';
import { uuidValidator } from '../validators/uuidValidator';
import { Container } from 'typedi';
import { ValidatedRequest } from 'express-joi-validation';
import { EntityUuidSchema } from '../schemas/EntityUuidSchema';
import { GroupController } from '../controllers/GroupController';
import { CreateGroupSchema } from '../schemas/groups/CreateGroupSchema';
import { createGroupValidator } from '../validators/groups/createGroupValidator';
import { updateGroupValidator } from '../validators/groups/updateGroupValidator';
import { UpdateGroupSchema } from '../schemas/groups/UpdateGroupSchema';

export const groupRouter = express.Router();

const groupController: GroupController = Container.get(GroupController);

groupRouter.post('', json(),
  createGroupValidator,
  (request: ValidatedRequest<CreateGroupSchema>, response: Response, next: NextFunction) => {
    groupController.create(request, response, next);
  },
);
groupRouter.get(`/:uuid`,
  uuidValidator,
  (request: ValidatedRequest<EntityUuidSchema>, response: Response, next: NextFunction) => {
    groupController.get(request, response, next);
  },
);
groupRouter.get('',
  (_, response: Response, next: NextFunction) => {
    groupController.getAll(response, next);
  },
);
groupRouter.patch('/:uuid', json(), uuidValidator, updateGroupValidator,
  (request: ValidatedRequest<UpdateGroupSchema>, response: Response, next: NextFunction) => {
    groupController.update(request, response, next);
  });
groupRouter.delete('/:uuid', uuidValidator,
  (request: ValidatedRequest<EntityUuidSchema>, response: Response, next: NextFunction) => {
    groupController.delete(request, response, next);
  });
