import { Sequelize } from 'sequelize-typescript';
import { ProfileEntity } from 'src/auth/entity/profile.entity';
import { UserEntity } from 'src/auth/entity/user.entity';
import { Tag } from 'src/todos/entity/tag.model';
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
      sequelize.addModels([Todo, UserEntity, ProfileEntity, Tag]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
