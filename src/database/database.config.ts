import { SequelizeModuleOptions } from '@nestjs/sequelize';

const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'AS123123',
  database: 'test',
  autoLoadModels: true,
  synchronize: true,
};

export default sequelizeConfig;
