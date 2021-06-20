import 'reflect-metadata';
import { UpdateUserDTO, User, UserModelAttributes } from '../models/User';
import { Service } from 'typedi';
import { Op } from 'sequelize';
import { Group } from '../models/Group';

@Service()
export class UserRepository {
  async create(user: User): Promise<User> {
    await user.save();

    return user;
  }

  async get(uuid: string): Promise<User | null> {
    return await User.findOne({
      where: {
        uuid,
        isDeleted: false,
      },
    });
  }

  async findByMask(mask: string, limit: number): Promise<User[]> {
    return await User.findAll({
      limit,
      where: {
        isDeleted: false,
        login: {
          [Op.startsWith]: mask,
        },
      },
      include: {
        model: Group,
        required: true,
      },
    });
  }

  async update(uuid: string, updateUser: Partial<UpdateUserDTO & Pick<UserModelAttributes, 'isDeleted'>> ): Promise<User | null> {
    const updatedUsers: [number, User[]] = await User.update(
      updateUser,
      {
        where: {
          uuid,
          isDeleted: false,
        },
        returning: true,
      });

    return updatedUsers[0] === 0 ? null : updatedUsers[1][0];
  }
}
