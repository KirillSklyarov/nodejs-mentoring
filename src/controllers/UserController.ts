import 'reflect-metadata';
import { ValidatedRequest } from 'express-joi-validation';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '../repositories/UserRepository';
import { Inject, Service } from 'typedi';
import { UpdateUserSchema } from '../schemas/UpdateUserSchema';
import { AutoSuggestUserSchema } from '../schemas/AutoSuggestUserSchema';
import { CreateUserSchema } from '../schemas/CreateUserSchema';
import { DeleteUserSchema } from '../schemas/DeleteUserSchema';
import { ApplicationError } from '../models/application-error';
import { UserMapperService } from '../services/user-mapper.service';
import { BaseError, UniqueConstraintError } from 'sequelize';

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

      const createdUer = await this.userRepository.create(user);

      response.json({ uuid: createdUer.uuid });
    } catch (e) {
      this.handleUniqueError(e, request.body.login, next);
    }

  }

  async get(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const uuid: string = request.params.uuid;

      const user = await this.userRepository.get(uuid);

      response.status(200).json({
        data: { user: this.userMapper.map(user) },
      });
    } catch (e) {
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
        data: {
          user: this.userMapper.map(updatedUser),
        },
      });
    } catch (e) {
      this.handleUniqueError(e, request.body.login, next);
    }
  }

  async delete(request: ValidatedRequest<DeleteUserSchema>, response: Response, next: NextFunction): Promise<void> {
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

  private handleUniqueError(err: BaseError, login: string | undefined, next: NextFunction): void {
    if (err instanceof UniqueConstraintError) {
      next(new ApplicationError(`login ${login} is already exist`, 409));
      return;
    }

    next(err);
  }
}
