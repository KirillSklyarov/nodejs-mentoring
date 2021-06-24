import 'reflect-metadata';
import { ValidatedRequest } from 'express-joi-validation';
import { NextFunction, Response } from 'express';
import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '../repositories/UserRepository';
import { Inject, Service } from 'typedi';
import { UpdateUserSchema } from '../schemas/users/UpdateUserSchema';
import { AutoSuggestUserSchema } from '../schemas/users/AutoSuggestUserSchema';
import { CreateUserSchema } from '../schemas/users/CreateUserSchema';
import { UserMapperService } from '../services/UserMapperService';
import { EntityUuidSchema } from '../schemas/EntityUuidSchema';

@Service()
export class UserController {
  @Inject()
  private userRepository: UserRepository;

  @Inject()
  private userMapper: UserMapperService;

  async create(request: ValidatedRequest<CreateUserSchema>, response: Response, next: NextFunction): Promise<void> {
    try {
      const user = User.build({
        uuid: uuidv4(),
        login: request.body.login,
        password: request.body.password,
        name: request.body.name,
        age: request.body.age,
      });

      const createdUser = await this.userRepository.create(user);

      response.json({ data: { uuid: createdUser.uuid } });
    } catch (e) {
      next(e);
    }

  }

  async get(request: ValidatedRequest<EntityUuidSchema>, response: Response, next: NextFunction): Promise<void> {
    try {
      const uuid: string = request.params.uuid;

      const user = await this.userRepository.get(uuid);

      response.status(200).json({
        data: { user: user ? this.userMapper.map(user) : null },
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async findByMask(request: ValidatedRequest<AutoSuggestUserSchema>, response: Response, next: NextFunction): Promise<void> {
    try {
      const users: User[] = await this.userRepository.findByMask(request.query.loginSubstring, request.query.limit);

      response.json({
        data: { users: users.map((user: User) => this.userMapper.map(user)) },
      });
    } catch (e) {
      next(e);
    }
  }

  async update(request: ValidatedRequest<UpdateUserSchema>, response: Response, next: NextFunction): Promise<void> {
    try {
      const updatedUser = await this.userRepository.update(request.params.uuid, {
        login: request.body.login,
        name: request.body.name,
        age: request.body.age,
      });

      response.json({
        data: { user: updatedUser ? this.userMapper.map(updatedUser) : null, },
      });
    } catch (e) {
      next(e);
    }
  }

  async delete(request: ValidatedRequest<EntityUuidSchema>, response: Response, next: NextFunction): Promise<void> {
    try {
      const uuid = request.params.uuid;
      const updatedUser: User | null = await this.userRepository.update(uuid, { isDeleted: true });

      response.json({
        data: {
          user: updatedUser ? { uuid } : null,
        },
      });
    } catch (e) {
      next(e);
    }
  }

}
