import 'reflect-metadata';
import { ValidatedRequest } from 'express-joi-validation';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Container, Inject, Service } from 'typedi';
import { GroupRepository } from '../repositories/GroupRepository';
import { GroupMapperService } from '../services/GroupMapperService';
import { EntityUuidSchema } from '../schemas/EntityUuidSchema';
import { Group } from '../models/Group';
import { CreateGroupSchema } from '../schemas/groups/CreateGroupSchema';
import { UpdateGroupSchema } from '../schemas/groups/UpdateGroupSchema';
import { AddUsersToGroupSchema } from '../schemas/groups/AddUsersToGroupSchema';
import { User } from '../models/User';
import { Sequelize } from 'sequelize-typescript';
import { ApplicationError } from '../models/ApplicationError';
import { UserRepository } from '../repositories/UserRepository';

@Service()
export class GroupController {
  @Inject()
  private groupRepository: GroupRepository;

  @Inject()
  private userRepository: UserRepository;

  @Inject()
  private groupMapper: GroupMapperService;

  async create(request: ValidatedRequest<CreateGroupSchema>, response: Response, next: NextFunction): Promise<void> {
    try {
      const group = Group.build({
        uuid: uuidv4(),
        name: request.body.name,
        permissions: request.body.permissions,
      });

      const createdGroup = await this.groupRepository.create(group);

      response.json({ data: { uuid: createdGroup.uuid } });
    } catch (e) {
      next(e)
    }

  }

  async get(request: ValidatedRequest<EntityUuidSchema>, response: Response, next: NextFunction): Promise<void> {
    try {
      const uuid: string = request.params.uuid;

      const group = await this.groupRepository.get(uuid);

      response.status(200).json({
        data: { group: group ? this.groupMapper.map(group) : null, },
      });
    } catch (e) {
      next(e);
    }
  }

  async getAll(response: Response, next: NextFunction): Promise<void> {
    try {
      const groups = await this.groupRepository.getAll();

      response.status(200).json({
        data: { groups: groups.map((group: Group) => this.groupMapper.map(group)), },
      });
    } catch (e) {
      next(e);
    }
  }

  async update(request: ValidatedRequest<UpdateGroupSchema>, response: Response, next: NextFunction): Promise<void> {
    try {
      const updatedGroup = await this.groupRepository.update(request.params.uuid, {
        name: request.body.name,
        permissions: request.body.permissions,
      });

      response.json({
        data: { group: updatedGroup ? this.groupMapper.map(updatedGroup) : null },
      });
    } catch (e) {
      next(e);
    }
  }

  async delete(request: ValidatedRequest<EntityUuidSchema>, response: Response, next: NextFunction): Promise<void> {
    try {
      const uuid = request.params.uuid;
      const result = await this.groupRepository.delete(uuid);

      response.json({
        data: {
          group: { uuid },
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async addUsers(request: ValidatedRequest<AddUsersToGroupSchema>, response: Response, next: NextFunction): Promise<void> {
    const uuid = request.params.uuid;
    const userUuids = request.body.users;
    const sequelize: Sequelize = Container.get(Sequelize);
    const transaction = await sequelize.transaction();

    try {
      const group: Group | null = await this.groupRepository.get(uuid, transaction);
      if (!group) {
        next(new ApplicationError(`Group ${uuid} not found`, 400));
        return;
      }

      const users: User[] = await this.userRepository.getByUuids(userUuids, transaction);
      if (users.length < userUuids.length) {
        next(new ApplicationError(`Users not found`, 400));
        return;
      }

      await this.groupRepository.addUsers(group, users, transaction);
      await transaction.commit();

      response.json({
        data: {
          group: this.groupMapper.map(group),
        },
      });
    } catch (e) {
      await transaction.rollback();
      next(e);
    }
  }
}
