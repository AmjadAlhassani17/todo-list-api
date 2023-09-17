import { AuthEntity } from './auth.entity';

export const authProviders = [
  {
    provide: 'AUTH_REPOSITORY',
    useValue: AuthEntity,
  },
];
