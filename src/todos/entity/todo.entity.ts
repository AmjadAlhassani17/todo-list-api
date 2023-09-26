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
  HasMany,
} from 'sequelize-typescript';
import { Tag } from './tag.model';
import { UserEntity } from 'src/auth/entity/user.entity';

@Table({ tableName: 'Todos', underscored: true })
export class Todo extends Model<Todo> {
  @PrimaryKey
  @ForeignKey(() => Tag)
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING(255))
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.BOOLEAN)
  is_completed: boolean;

  @Column(DataType.STRING)
  avatar: string;

  @ForeignKey(() => UserEntity)
  @Column(DataType.INTEGER)
  user_id: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;

  @HasMany(() => Tag)
  tags: Tag[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
