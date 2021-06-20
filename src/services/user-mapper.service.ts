import { Container, Service } from "typedi";
import { ResponseUserDTO, User } from '../models/User';
import { GroupMapperService } from './group-mapper.service';
import { Group } from '../models/Group';

@Service()
export class UserMapperService {

  private readonly groupMapper: GroupMapperService;

  constructor() {
    this.groupMapper = Container.get(GroupMapperService);
  }

  map(user: User): ResponseUserDTO {
    return {
      uuid: user.uuid,
      login: user.login,
      name: user.name,
      age: user.age,
    };
  }

}
