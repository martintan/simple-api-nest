import * as mongoose from 'mongoose';

export const CitySchema = new mongoose.Schema({
  name: String,
  country: String,
  temperature: Number,
  humidity: Number,
  isDeleted: { type: Boolean, default: false },
});

export interface City extends mongoose.Document {
  id: string;
  name: string;
  country: string;
  temperature: number;
  humidity: number;
  isDeleted: boolean;
}
