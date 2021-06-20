import 'reflect-metadata';
import { ValidatedRequest } from 'express-joi-validation';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Inject, Service } from 'typedi';
import { GroupRepository } from '../repositories/GroupRepository';
import { GroupMapperService } from '../services/group-mapper.service';
import { EntityUuidSchema } from '../schemas/EntityUuidSchema';
import { Group } from '../models/Group';
import { CreateGroupSchema } from '../schemas/groups/CreateGroupSchema';
import { UpdateGroupSchema } from '../schemas/groups/UpdateGroupSchema';

@Service()
export class GroupController {
  @Inject()
  private groupRepository: GroupRepository;

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
}
