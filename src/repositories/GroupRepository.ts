import 'reflect-metadata';
import { Service } from 'typedi';
import { Group, UpdateGroupDTO } from '../models/Group';
import { User, UserModelAttributes } from '../models/User';

@Service()
export class GroupRepository {
  async create(group: Group): Promise<Group> {
    await group.save();

    return group;
  }

  async get(uuid: string): Promise<Group | null> {
    return await Group.findOne({
      where: {
        uuid,
      },
    });
  }

  async getAll(): Promise<Group[]> {
    return await Group.findAll();
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
}
