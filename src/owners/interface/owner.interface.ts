import { Document } from 'mongoose';

export interface Owner extends Document {
  readonly firstName: string;
  readonly lastName: string;
}
