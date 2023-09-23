import { ProfileEntity } from './entity/profile.entity';
import { UserEntity } from './entity/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: UserEntity,
  },
];

export const profileProviders = [
  {
    provide: 'PROFILE_REPOSITORY',
    useValue: ProfileEntity,
  },
];
