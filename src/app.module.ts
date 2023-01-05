import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MONGODB_URL } from './constants';
import { CityModule } from './modules/city/city.module';
import { WeatherModule } from './modules/weather/weather.module';

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URL), CityModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
