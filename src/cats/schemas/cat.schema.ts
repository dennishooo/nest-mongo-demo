import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import * as mongoose from 'mongoose';
import { Owner } from 'src/owners/schema/owner.schema';

export type CatDocument = Cat & mongoose.Document;
@Schema({
  timestamps: true,
  // ,_id: false
})
export class Cat {
  // @Prop({ type: mongoose.Schema.Types.ObjectId })
  // _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;
  @Prop()
  age: number;
  @Prop()
  breed: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  @Type(() => Owner)
  owner: Owner;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
