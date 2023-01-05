import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCityDto } from './dtos/create-city.dto';
import { UpdateCityDto } from './dtos/update-city.dto';
import { City } from './models/city.model';

@Injectable()
export class CityService {
  constructor(@InjectModel('City') private readonly cityModel: Model<City>) {}

  async findAll(): Promise<City[]> {
    return this.cityModel.find({ isDeleted: false }).exec();
  }

  async create(city: CreateCityDto): Promise<City> {
    const newCity = new this.cityModel(city);
    return newCity.save();
  }

  async findByName(name: string): Promise<City> {
    const cities = await this.cityModel
      .where({ name, isDeleted: false })
      .exec();
    return cities.pop();
  }

  async findById(id: string): Promise<City> {
    return this.cityModel.findById(id).where({ isDeleted: false }).exec();
  }

  async update(id: string, city: UpdateCityDto): Promise<City> {
    return this.cityModel.findByIdAndUpdate(id, city, { new: true }).exec();
  }

  async deleteCity(id: string): Promise<City> {
    return this.cityModel
      .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .exec();
  }
}
