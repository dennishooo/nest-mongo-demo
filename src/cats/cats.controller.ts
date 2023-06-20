import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';

@Controller('cats')
@Injectable()
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    console.log(createCatDto);

    return await this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return await this.catsService.findAll();
  }

  @Get('count')
  async findOldPets(@Query('age', ParseIntPipe) age: number): Promise<Cat[]> {
    return await this.catsService.countOldPet(age);
  }

  @Delete(':id')
  async deleteOne(@Param() { id }: { id: string }): Promise<Cat[]> {
    return await this.catsService.deleteById(id);
  }

  @Delete()
  async deleteMany(@Query() { breed }: { breed: string }): Promise<Cat[]> {
    return await this.catsService.deleteByBreed(breed);
  }
}
