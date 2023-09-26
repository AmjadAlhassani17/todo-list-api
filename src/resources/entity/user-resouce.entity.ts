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
  BelongsTo,
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
  user_id: number;

  @ForeignKey(() => ResourceEntity)
  @Column(DataType.INTEGER)
  resource_id: number;

  @BelongsTo(() => UserEntity, { as: 'user' })
  user: UserEntity;

  @BelongsTo(() => ResourceEntity, { as: 'resource' })
  resource: ResourceEntity;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
