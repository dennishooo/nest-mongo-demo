import mongoose, { Model } from 'mongoose';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Owner } from './schema/owner.schema';

export class OwnersService {
  constructor(@InjectModel(Owner.name) private ownerModel: Model<Owner>) {}
  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return await this.ownerModel.create(createOwnerDto);
  }

  async findAll(): Promise<Owner[]> {
    return await this.ownerModel.find();
  }

  async findById(id: string): Promise<Owner[]> {
    const objectId = new mongoose.Types.ObjectId(id);

    return this.ownerModel
      .aggregate()
      .match({ _id: { $eq: objectId } })
      .lookup({
        from: 'cats',
        localField: '_id',
        foreignField: 'owner',
        as: 'cats',
      });
  }

  async deleteById(id: string): Promise<any> {
    return await this.ownerModel.deleteOne({ _id: id }).exec();
    // return this.catModel.deleteOne().where('_id').equals(id).exec();
  }
}
