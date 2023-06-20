import { Connection } from 'mongoose';
import { OwnerSchema } from './schema/owner.schema';

export const ownersProviders = [
  {
    provide: 'OWNER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Owner', OwnerSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
