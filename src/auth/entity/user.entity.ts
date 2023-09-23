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
import { ProfileEntity } from './profile.entity';

@Table({ tableName: 'users', underscored: true })
export class UserEntity extends Model<UserEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column({ type: DataType.STRING, defaultValue: 'user' })
  role: string;

  @HasOne(() => ProfileEntity, 'id')
  profile: ProfileEntity;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
