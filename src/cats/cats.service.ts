import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @Inject('CAT_MODEL')
    private catModel: Model<Cat>, // constructor complied from schema, responsible for creating and reading documents
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    // const createdCat = new this.catModel(createCatDto)
    const createdCat = await this.catModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
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
