import { AuthEntity } from './entity/auth.entity';

export const authProviders = [
  {
    provide: 'AUTH_REPOSITORY',
    useValue: AuthEntity,
  },
];
