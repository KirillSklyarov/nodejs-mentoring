import { Container } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import { User } from '../models/User';
import { Group } from '../models/Group';
import { UserGroup } from '../models/UserGroup';

export function databaseLoader(): void {
  const {
    DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_DIALECT,
  } = process.env;
  const sequelize = new Sequelize({
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    dialect: DB_DIALECT as Dialect,
    models: [User, Group, UserGroup],
  });

  Container.set<Sequelize>(Sequelize, sequelize);
}
