import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { UserResourceEntity } from './user-resouce.entity';

@Table({ tableName: 'Resources', underscored: true })
export class ResourceEntity extends Model<ResourceEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  fileType: string;

  @Column(DataType.STRING)
  fileUrl: string;

  @HasMany(() => UserResourceEntity)
  userResources: UserResourceEntity[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
