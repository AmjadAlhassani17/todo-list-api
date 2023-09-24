import { ResourceEntity } from './entity/resources.entity';
import { UserResourceEntity } from './entity/user-resouce.entity';
import { v2 } from 'cloudinary';

export const userResourceProviders = [
  {
    provide: 'USER_RESOURCE_REPOSITORY',
    useValue: UserResourceEntity,
  },
];

export const resourceProviders = [
  {
    provide: 'RESOURCE_REPOSITORY',
    useValue: ResourceEntity,
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
