import * as mongoose from 'mongoose';
// import { Owner } from '../interface/owner.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Cat } from 'src/cats/schemas/cat.schema';
// import { Cat } from 'src/cats/schemas/cat.schema';

// export const OwnerSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   cats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cat' }],
// });

export type OwnerDocument = Owner & mongoose.Document;
@Schema({ timestamps: true })
export class Owner {
  @Prop({ required: true })
  firstName: string;
  @Prop()
  lastName: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Cat.name }])
  cats: [Cat];
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
