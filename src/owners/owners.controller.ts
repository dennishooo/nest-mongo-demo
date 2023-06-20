import { Controller, Get, Injectable } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { Owner } from './interface/owner.interface';

@Controller('owners')
@Injectable()
export class OwnersController {
  constructor(private ownersService: OwnersService) {}
  @Get()
  async findAll(): Promise<Owner[]> {
    return await this.ownersService.findAll();
  }
}
