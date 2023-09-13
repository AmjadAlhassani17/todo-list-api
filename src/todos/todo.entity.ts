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

@Table({ tableName: 'Todos' })
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
}
