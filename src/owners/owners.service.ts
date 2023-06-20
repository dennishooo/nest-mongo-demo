import { Model } from 'mongoose';
import { Owner } from './interface/owner.interface';
import { Inject } from '@nestjs/common';

export class OwnersService {
  constructor(@Inject('OWNER_MODEL') private ownerModel: Model<Owner>) {}
  async findAll(): Promise<Owner[]> {
    return this.ownerModel.find().exec();
  }
}
