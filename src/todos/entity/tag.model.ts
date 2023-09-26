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
import { Todo } from './todo.entity';

@Table({ tableName: 'Tags', underscored: true })
export class Tag extends Model<Tag> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING(255))
  name: string;

  @ForeignKey(() => Todo)
  @Column(DataType.INTEGER)
  todo_id: number;

  @BelongsTo(() => Todo)
  todo: Todo;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
