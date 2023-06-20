import { Model } from 'mongoose';
import { Owner } from './interface/owner.interface';
import { Inject } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';

export class OwnersService {
  constructor(@Inject('OWNER_MODEL') private ownerModel: Model<Owner>) {}
  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return await this.ownerModel.create(createOwnerDto);
  }
  async findAll(): Promise<Owner[]> {
    return this.ownerModel.find().exec();
  }
}
