import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Cat } from 'src/cats/schemas/cat.schema';
import { Type } from 'class-transformer';

export type OwnerDocument = Owner & mongoose.Document;
@Schema({
  timestamps: true,
  // , _id: false
})
export class Owner {
  //   @Prop({ type: mongoose.Schema.Types.ObjectId })
  //   _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  firstName: string;
  @Prop()
  lastName: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Cat' }]) // not working with Cat.name
  //   @Type(() => Cat)
  cats: [Cat];
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
