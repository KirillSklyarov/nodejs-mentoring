import 'reflect-metadata';
import { Container, Service } from 'typedi';
import { Group, UpdateGroupDTO } from '../models/Group';
import { Sequelize } from 'sequelize-typescript';
import { UserRepository } from './UserRepository';
import { Transaction } from 'sequelize';
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
      });

    return updatedGroups[0] === 0 ? null : updatedGroups[1][0];
  }

  async delete(uuid: string): Promise<number> {
    return await Group.destroy({
      where: {
        uuid,
      },
    });
  }

  async addUsers(uuid: string, userUuids: string[]): Promise<Group> {
    const sequelize: Sequelize = Container.get(Sequelize);
    const transaction = await sequelize.transaction();
    let group: Group | null = null;

    try {
      group = await this.get(uuid, transaction);
      if (!group) {
        throw new ApplicationError(`Group ${uuid} not found`, 400);
      } else {
        const userRepository: UserRepository = Container.get(UserRepository);
        const users: User[] = await userRepository.getByUuids(userUuids, transaction);
        if (users.length < userUuids.length) {
          const notFoundUserUuids: string[] = [];
          userUuids.forEach((userUuid: string) => {
            const user = users.find((user: User) => user.uuid === userUuid);
            if (!user) {
              notFoundUserUuids.push(userUuid);
            }
          });
          throw new ApplicationError(`Users not found: ` + notFoundUserUuids.join(', '), 400);
        } else {
          await group.$add('users', users, { transaction });
          await group.save({ transaction });
          await transaction.commit();
        }
      }
    } catch (e) {
      await transaction.rollback();
      throw e;
    }

    await group.reload({
      include: {
        model: User,
        attributes: ['uuid'],
      },
    });

    return group;
  }
}
