import { Sequelize } from 'sequelize-typescript';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { Todo } from 'src/todos/entity/todo.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME,
      });
      sequelize.addModels([Todo, AuthEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
