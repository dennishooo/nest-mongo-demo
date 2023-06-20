import mongoose, { Model } from 'mongoose';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Owner } from './schema/owner.schema';

export class OwnersService {
  constructor(@InjectModel(Owner.name) private ownerModel: Model<Owner>) {}
  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return await this.ownerModel.create(createOwnerDto);
  }

  addPet(id: string, catId: string) {
    const objectId = new mongoose.Types.ObjectId(catId);
    console.log({ id, objectId });

    return this.ownerModel.findByIdAndUpdate(
      id,
      { $addToSet: { cats: catId } },
      { new: true },
    );
  }
  async findAll(): Promise<Owner[]> {
    return this.ownerModel.find().populate('cats').exec();
  }

  async findById(id: string): Promise<Owner> {
    return this.ownerModel.findById(id);

    //     return this.ownerModel.aggregate().lookup({
    //       from: 'cats',
    //       localField: 'ownerId',
    //       foreignField: '_id',
    //       as: 'cats',
    //     });
    //   }
  }
}
