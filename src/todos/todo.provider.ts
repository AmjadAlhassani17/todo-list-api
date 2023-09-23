import { Tag } from './entity/tag.model';
import { Todo } from './entity/todo.entity';

export const todosProviders = [
  {
    provide: 'TODOS_REPOSITORY',
    useValue: Todo,
  },
];

export const tagsProviders = [
  {
    provide: 'TAGS_REPOSITORY',
    useValue: Tag,
  },
];
