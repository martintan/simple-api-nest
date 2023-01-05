import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { WeatherService } from '../weather/weather.service';
import { CityController } from './city.controller';
import { CityService } from './city.service';

const MOCK_CITY = {
  _id: '63b7106e72376bc2bb45839a',
  name: 'Pasig',
  country: 'PH',
  temperature: 297.34,
  humidity: 92,
  isDeleted: false,
  __v: 0,
};

const MOCK_WEATHER_RESPONSE = {
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

describe('CityController', () => {
  let cityController: CityController;
  let cityService: CityService;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        {
          provide: getModelToken('City'),
          useValue: Model,
        },
        CityService,
        WeatherService,
      ],
    }).compile();

    cityController = module.get<CityController>(CityController);
    cityService = module.get<CityService>(CityService);
    weatherService = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(cityController).toBeDefined();
  });

  describe('getAllCities', () => {
    it('should return an array of cities', async () => {
      const mockCities = [{ ...MOCK_CITY }];
      console.log('cityService:', cityService);
      jest.spyOn(cityService, 'findAll').mockResolvedValue(mockCities as any);
      const result = await cityController.getAllCities();
      expect(result).toEqual({ cities: mockCities });
    });
  });

  describe('getCityByName', () => {
    it('should return a city by name', async () => {
      const mockCity = { ...MOCK_CITY };
      jest.spyOn(cityService, 'findByName').mockResolvedValue(mockCity as any);
      const result = await cityController.getCityByName(MOCK_CITY.name);
      expect(result).toEqual(mockCity);
    });
  });

  describe('createCity', () => {
    it('should return a newly created city', async () => {
      const mockCity = { ...MOCK_CITY };
      jest.spyOn(cityService, 'create').mockResolvedValue(mockCity as any);
      jest
        .spyOn((weatherService as any).httpClient, 'get')
        .mockResolvedValue(MOCK_WEATHER_RESPONSE);
      const result = await cityController.createCity({ city: MOCK_CITY.name });
      expect(result).toEqual(mockCity);
    });
  });

  describe('updateCity', () => {
    it('should return the city with the name updated', async () => {
      const mockCity = { ...MOCK_CITY };
      const mockUpdatedCity = {
        ...mockCity,
        name: mockCity.name + '-updated',
        country: mockCity.country + '-updated',
      };
      jest
        .spyOn(cityService, 'update')
        .mockResolvedValue(mockUpdatedCity as any);
      const result = await cityController.updateCity(mockCity._id, {
        name: mockUpdatedCity.name,
        country: mockUpdatedCity.country,
      });
      expect(result).toEqual(mockUpdatedCity);
    });
  });

  describe('deleteCity', () => {
    it('should return success: false with an invalid City ID', async () => {
      jest.spyOn(cityService, 'findById').mockResolvedValue(null);
      const result = await cityController.deleteCity('123');
      expect(result).toEqual({ success: false });
    });

    it('should return success: true with a valid City ID', async () => {
      const mockCity = { ...MOCK_CITY };
      jest.spyOn(cityService, 'findById').mockResolvedValue(mockCity as any);
      jest.spyOn(cityService, 'deleteCity').mockResolvedValue(mockCity as any);
      const result = await cityController.deleteCity(MOCK_CITY._id);
      expect(result).toEqual({ success: true });
    });
  });
});
