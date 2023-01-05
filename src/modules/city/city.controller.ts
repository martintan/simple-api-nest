import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../constants';
import { WeatherService } from '../weather/weather.service';
import { CityService } from './city.service';
import { CityResponse } from './contracts/city.contract';
import { CreateCityRequest } from './contracts/create-city.contract';
import { DeleteCityResponse } from './contracts/delete-city.contract';
import { GetAllCitiesResponse } from './contracts/get-all-cities.contract';
import { UpdateCityRequest } from './contracts/update-city.contract';

@Controller('city')
export class CityController {
  constructor(
    private readonly cityService: CityService,
    private readonly weatherService: WeatherService,
  ) {}

  @Get('all')
  async getAllCities(): Promise<GetAllCitiesResponse> {
    try {
      const cities = await this.cityService.findAll();
      return { cities };
    } catch (err) {
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  @Get('name')
  async getCityByName(@Query('name') name: string): Promise<CityResponse> {
    try {
      const city = await this.cityService.findByName(name);
      if (!city) throw new NotFoundException(`City "${name}" not found`);
      return city;
    } catch (err) {
      throw err;
    }
  }

  @Post()
  async createCity(@Body() request: CreateCityRequest): Promise<CityResponse> {
    try {
      const weather = await this.weatherService.getCurrentWeather(request.city);
      return await this.cityService.create({
        name: request.city,
        country: weather.sys.country,
        temperature: weather.main.temp,
        humidity: weather.main.humidity,
      });
    } catch (err) {
      throw new InternalServerErrorException(INTERNAL_SERVER_ERROR_MESSAGE);
    }
  }

  @Put(':id')
  async updateCity(
    @Param('id') id: string,
    @Body() updates: UpdateCityRequest,
  ): Promise<CityResponse> {
    try {
      const city = await this.cityService.update(id, updates);
      if (!city) throw new BadRequestException(`City with ID ${id} not found`);
      return city;
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  async deleteCity(@Param('id') id: string): Promise<DeleteCityResponse> {
    try {
      const city = await this.cityService.findById(id);
      if (!city) throw new BadRequestException(`City with ID ${id} not found`);
      await this.cityService.deleteCity(id);
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  }
}
