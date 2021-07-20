import 'reflect-metadata';
import { Container, Service } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { Group, UpdateGroupDTO } from '../models/Group';
import { UserRepository } from './UserRepository';
import { ApplicationError } from '../models/ApplicationError';
import { User } from '../models/User';

@Service()
export class GroupRepository {
  async create(group: Group): Promise<Group> {
    await group.save();

    return group;
  }

  async get(uuid: string, transaction: Transaction | null = null): Promise<Group | null> {
    return await Group.findOne({
      transaction,
      where: {
        uuid,
      },
      include: {
        model: User,
        attributes: ['uuid'],
      },
    });
  }

  async getAll(): Promise<Group[]> {
    return await Group.findAll({
      include: {
        model: User,
        attributes: ['uuid'],
      },
    });
  }

  async update(uuid: string, updateGroup: UpdateGroupDTO): Promise<Group | null> {
    const updatedGroups: [number, Group[]] = await Group.update(
      updateGroup,
      {
        where: {
          uuid,
        },
        returning: true,
      },
    );

    return updatedGroups[0] === 0 ? null : updatedGroups[1][0];
  }

  async delete(uuid: string): Promise<number> {
    return await Group.destroy({
      where: {
        uuid,
      },
    });
  }

  async addUsers(group: Group, users: User[], transaction: Transaction | null = null): Promise<Group> {
    await group.$add('users', users, { transaction });
    await group.save({ transaction });
    await group.reload({
      transaction,
      include: {
        model: User,
        attributes: ['uuid'],
      },
    });

    return group;
  }
}
