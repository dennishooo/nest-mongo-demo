import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Owner } from 'src/owners/schema/owner.schema';
// import { Owner } from 'src/owners/interface/owner.interface';

// export const CatSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   breed: String,
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
// });

export type CatDocument = Cat & mongoose.Document;
@Schema({ timestamps: true })
export class Cat {
  @Prop({ required: true })
  name: string;
  @Prop()
  age: number;
  @Prop()
  breed: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  // owner: Owner;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
