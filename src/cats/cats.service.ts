import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './schemas/cat.schema';
import { Owner } from 'src/owners/schema/owner.schema';

@Injectable()
export class CatsService {
  constructor(
    // constructor complied from schema, responsible for creating and reading documents
    @InjectModel(Cat.name)
    private catModel: Model<Cat>,
    @InjectModel(Owner.name)
    private ownerModel: Model<Owner>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<any> {
    // const createdCat = new this.catModel(createCatDto)
    const foundOwner = await this.ownerModel.findById(createCatDto.owner);
    console.log({ foundOwner });

    const createdCat = await this.catModel.create({
      ...createCatDto,
      owner: foundOwner,
    });
    return createdCat;
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findById(id: string): Promise<Cat[]> {
    console.log({ id });
    const objectId = new mongoose.Types.ObjectId(id);

    return this.catModel.find({ _id: id }).populate('owner');
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
