import { User } from '../models/User';
import { CreateUser } from '../models/CreateUser';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUser } from '../models/UpdateUser';
import { ApplicationError } from '../models/application-error';

const store = new Map<string, User>();

export function getByIdFromDB(id: string): User {
  const user: User | undefined = store.get(id);
  if (user) {
    return user;
  }

  throw new Error(`user ${id} not found`);
}

export function createUserInDB(newUser: CreateUser): string {
  const id = uuidv4();
  const user: User = {
    ...newUser,
    id,
    isDeleted: false,
  };

  const userList = Array.from(store.values()).forEach((u: User) => {
    if (u.login === user.login && !u.isDeleted) {
      throw new Error();
    }
  });

  store.set(id, user);

  return id;
}

export function updateUserInDB(id: string, updateUser: UpdateUser) {
  const user = store.get(id);

  if (!user || user.isDeleted) {
    throw new Error('not found');
  }

  const userList = Array.from(store.values()).forEach((u: User) => {
    if (u.login === updateUser.login && u.id !== id) {
      throw new Error('conflict');
    }
  });

  user.login = updateUser.login;
  user.age = updateUser.age;
}
