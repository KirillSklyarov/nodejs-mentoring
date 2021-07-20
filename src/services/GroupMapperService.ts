import { Service } from 'typedi';
import { Group, ResponseGroupDTO } from '../models/Group';

@Service()
export class GroupMapperService {
  map(group: Group): ResponseGroupDTO {
    const result: ResponseGroupDTO = {
      uuid: group.uuid,
      name: group.name,
      permissions: group.permissions,
    };

    if (group.users) {
      result.users = group.users.map((user) => ({ uuid: user.uuid }));
    }

    return result;
  }
}
