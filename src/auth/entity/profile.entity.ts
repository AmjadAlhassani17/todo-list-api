import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';
import { UserEntity } from './user.entity';

@Table({ tableName: 'profiles', underscored: true })
export class ProfileEntity extends Model<ProfileEntity> {
  @PrimaryKey
  @ForeignKey(() => UserEntity)
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  first_name: string;

  @Column(DataType.STRING)
  last_name: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
