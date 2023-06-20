import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { Injectable, Inject } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Owner } from 'src/owners/interface/owner.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(
    // constructor complied from schema, responsible for creating and reading documents
    @InjectModel(Cat.name)
    private catModel: Model<Cat>, // private ownerModel: Model<Owner>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    // const createdCat = new this.catModel(createCatDto)
    // const user = this.ownerModel.findById(createCatDto.ownerId);
    // console.log({ foundUser: user });

    const createdCat = await this.catModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findById(id: string): Promise<Cat[]> {
    console.log({ id });
    const objectId = new mongoose.Types.ObjectId(id);

    return this.catModel.find({ _id: id }).populate('owner');
    // .aggregate()
    //   [
    //   {
    //     $lookup: {
    //       from: 'owners',
    //       localField: 'ownerId',
    //       foreignField: '_id',
    //       as: 'owners',
    //     },
    //   },
    // ]

    // .unwind()
    // .match({ _id: { $eq: objectId } })

    // .findOne({ _id: id });
    // .where()
    // .aggregate()

    // .project()
    // .lookup({
    //   from: 'owners',
    //   localField: 'ownerId',
    //   foreignField: '_id',
    //   as: 'owners',
    // })
  }

  async countOldPet(age: number): Promise<Cat[]> {
    // return await this.catModel.aggregate([
    //   { $match: { age: { $gt: age } } },
    //   { $group: { _id: '$age', count: { $sum: 1 } } },
    // ]);

    return await this.catModel
      .aggregate()
      .match({ age: { $gt: age } })
      .group({ _id: '$age', count: { $sum: 1 } });
  }

  async deleteById(id: string): Promise<any> {
    return this.catModel.deleteOne({ _id: id }).exec();
    // return this.catModel.deleteOne().where('_id').equals(id).exec();
  }

  async deleteByBreed(breed: string): Promise<any> {
    // DeleteResult Type?
    return this.catModel.deleteMany().where('breed').equals(breed).exec();
  }
}
