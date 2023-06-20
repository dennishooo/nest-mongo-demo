import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { Owner } from './schema/owner.schema';

@Controller('owners')
@Injectable()
export class OwnersController {
  constructor(private ownersService: OwnersService) {}

  @Post()
  async create(@Body() createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return await this.ownersService.create(createOwnerDto);
  }

  @Get()
  async findAll(): Promise<Owner[]> {
    return await this.ownersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Owner[]> {
    return await this.ownersService.findById(id);
  }

  @Delete(':id')
  async deleteOne(@Param() { id }: { id: string }): Promise<Owner> {
    return await this.ownersService.deleteById(id);
  }
}
