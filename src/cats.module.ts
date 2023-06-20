import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { catsProviders } from './cats.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CatsController],
  providers: [CatsService, ...catsProviders],
})
export class CatsModule {}