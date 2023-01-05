import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherService],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get current weather', async () => {
    const city = 'San Francisco';
    const mockResponse = {
      data: {
        main: {
          temp: 290,
          humidity: 70,
        },
        weather: [
          {
            description: 'clear sky',
          },
        ],
        name: 'San Francisco',
        sys: {
          country: 'US',
        },
      },
    };
    jest
      .spyOn((service as any).httpClient, 'get')
      .mockResolvedValue(mockResponse);
    const result = await service.getCurrentWeather(city);
    expect(result).toEqual(mockResponse.data);
  });
});
