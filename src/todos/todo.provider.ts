import { Todo } from './entity/todo.entity';

export const todosProviders = [
  {
    provide: 'TODOS_REPOSITORY',
    useValue: Todo,
  },
];
