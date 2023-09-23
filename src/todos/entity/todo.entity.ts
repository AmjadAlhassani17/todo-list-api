import {
  Table,
  Model,
  PrimaryKey,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Tag } from './tag.model';

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

  @ForeignKey(() => Tag)
  @Column(DataType.STRING)
  tagName: string;

  @BelongsTo(() => Tag)
  tag: Tag;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column({ type: DataType.INTEGER })
  createdBy: number;

  @Column({ type: DataType.INTEGER })
  updatedBy: number;
}
