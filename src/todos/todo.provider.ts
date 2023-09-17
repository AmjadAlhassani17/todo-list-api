import { Todo } from './todo.entity';

export const todosProviders = [
  {
    provide: 'TODOS_REPOSITORY',
    useValue: Todo,
  },
];
