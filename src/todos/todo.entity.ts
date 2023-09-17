import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  AutoIncrement,
  ForeignKey,
  DeletedAt,
} from 'sequelize-typescript';
import { AuthEntity } from 'src/auth/auth.entity';

@Table({ tableName: 'Todos', underscored: true })
export class Todo extends Model<Todo> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING(255))
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.BOOLEAN)
  isCompleted: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;

  @ForeignKey(() => AuthEntity)
  @Column({ type: DataType.INTEGER })
  createdBy: number;

  @ForeignKey(() => AuthEntity)
  @Column({ type: DataType.INTEGER })
  updatedBy: number;

  @ForeignKey(() => AuthEntity)
  @Column({ type: DataType.INTEGER })
  deletedBy: number;
}
