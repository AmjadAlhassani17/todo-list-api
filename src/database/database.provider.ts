import { Sequelize } from 'sequelize-typescript';
import { AuthEntity } from 'src/auth/auth.entity';
import { Todo } from 'src/todos/todo.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'AS123123',
        database: 'todolist',
      });
      sequelize.addModels([Todo, AuthEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
