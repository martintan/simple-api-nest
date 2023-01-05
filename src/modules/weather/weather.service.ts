import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
  OPEN_WEATHER_MAP_API_BASE_URL,
  OPEN_WEATHER_MAP_API_KEY,
} from '../../constants';
import { GetCurrentWeatherResponse } from './contracts/get-current-weather.response';

@Injectable()
export class WeatherService {
  private readonly httpClient: AxiosInstance;
  private readonly apiBaseUrl: string;
  private readonly DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

  constructor() {
    this.apiBaseUrl = OPEN_WEATHER_MAP_API_BASE_URL;
    this.httpClient = axios.create({
      headers: this.DEFAULT_HEADERS,
    });
  }

  async getCurrentWeather(city: string): Promise<GetCurrentWeatherResponse> {
    const url = `${this.apiBaseUrl}/weather?q=${city}&appid=${OPEN_WEATHER_MAP_API_KEY}`;
    const res = await this.httpClient.get<GetCurrentWeatherResponse>(url);
    return res.data;
  }
}
