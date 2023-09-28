import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  AutoIncrement,
  HasOne,
} from 'sequelize-typescript';
import { UserResourceEntity } from './user-resouce.entity';

@Table({ tableName: 'Resources', underscored: true })
export class ResourceEntity extends Model<ResourceEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  file_type: string;

  @Column(DataType.STRING)
  file_name: string;

  @Column(DataType.STRING)
  mim_type: string;

  @Column(DataType.STRING)
  file_size: string;

  @Column(DataType.STRING)
  file_url: string;

  @HasOne(() => UserResourceEntity)
  userResources: UserResourceEntity;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
