import * as mongoose from 'mongoose';

export const OwnerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});
