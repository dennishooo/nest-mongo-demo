import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { Owner } from './interface/owner.interface';
import { CreateOwnerDto } from './dto/create-owner.dto';

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
}
