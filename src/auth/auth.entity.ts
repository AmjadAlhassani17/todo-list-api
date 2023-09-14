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

@Table({ tableName: 'users' })
export class AuthEntity extends Model<AuthEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  username: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column({ type: DataType.STRING, defaultValue: 'user' })
  role: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
