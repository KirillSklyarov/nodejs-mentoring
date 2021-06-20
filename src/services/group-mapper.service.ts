import { Container, Service } from "typedi";
import { Group, ResponseGroupDTO } from '../models/Group';
import { UserMapperService } from './user-mapper.service';

@Service()
export class GroupMapperService {

  map(group: Group): ResponseGroupDTO {
    return {
      uuid: group.uuid,
      name: group.name,
      permissions: group.permissions,
    };
  }

}
