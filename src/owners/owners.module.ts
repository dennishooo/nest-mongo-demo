import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { ownersProviders } from './owners.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OwnersController],
  providers: [OwnersService, ...ownersProviders],
})
export class OwnersModule {}
