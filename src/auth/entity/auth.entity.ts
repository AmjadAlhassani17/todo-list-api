import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'users', underscored: true })
export class AuthEntity extends Model<AuthEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  first_name: string;

  @Column(DataType.STRING)
  last_name: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column({ type: DataType.STRING, defaultValue: 'user' })
  role: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
