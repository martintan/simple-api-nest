import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('City'),
          useValue: Model,
        },
        CityService,
      ],
    }).compile();

    service = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
