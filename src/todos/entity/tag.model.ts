import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  ForeignKey,
  HasOne,
  AutoIncrement,
} from 'sequelize-typescript';
import { Todo } from './todo.entity';

@Table({ tableName: 'Tags', underscored: true })
export class Tag extends Model<Tag> {
  @PrimaryKey
  @ForeignKey(() => Todo)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING(255))
  tag_name: string;

  @HasOne(() => Todo)
  todo: Todo;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
