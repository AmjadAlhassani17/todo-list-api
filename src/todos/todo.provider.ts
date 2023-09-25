import { Tag } from './entity/tag.model';
import { Todo } from './entity/todo.entity';
import { v2 } from 'cloudinary';

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

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (): any => {
    return v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
