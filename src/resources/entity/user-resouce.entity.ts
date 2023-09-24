import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  ForeignKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { ResourceEntity } from './resources.entity';
import { UserEntity } from 'src/auth/entity/user.entity';

@Table({ tableName: 'UserResources', underscored: true })
export class UserResourceEntity extends Model<UserResourceEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => UserEntity)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => ResourceEntity)
  @Column(DataType.INTEGER)
  resourceId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
