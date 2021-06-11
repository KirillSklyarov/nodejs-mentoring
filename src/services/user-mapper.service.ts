import { Service } from "typedi";
import { User } from '../models/User';
import { ResponseUserDTO } from '../models/UserDTO';
import { intersect } from '@hapi/hoek';
import Array = intersect.Array;

@Service()
export class UserMapperService {

  map(user: User | null): ResponseUserDTO | null {
    return user ? {
      uuid: user.uuid,
      login: user.login,
      name: user.name,
      age: user.age,
    } : null;
  }

}
