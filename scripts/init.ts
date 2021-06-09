import { Sequelize } from 'sequelize-typescript'
import { User } from '../src/models/User';
import { v4 as uuidv4 } from 'uuid';
import { Dialect } from 'sequelize';

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_DIALECT } = process.env;
const sequelize = new Sequelize({
  host: DB_HOST,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  dialect: DB_DIALECT as Dialect,
  models: [User],
});

(async () => {
  await sequelize.sync();

  const user = User.build({
    uuid: uuidv4(),
    login: 'nick',
    password: 'qwerty',
    name: 'nick',
    age: 30,
  });

  await user.save();

  await sequelize.close();
})()


