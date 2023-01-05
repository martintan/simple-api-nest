import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherModule } from '../weather/weather.module';
import { WeatherService } from '../weather/weather.service';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CitySchema } from './models/city.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'City', schema: CitySchema }]),
    WeatherModule,
  ],
  controllers: [CityController],
  providers: [CityService, WeatherService],
})
export class CityModule {}
