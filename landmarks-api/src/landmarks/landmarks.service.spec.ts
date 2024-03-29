import { Test, TestingModule } from '@nestjs/testing';
import { LandmarksService } from './landmarks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Landmark } from './entities/landmark.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('LandmarksService', () => {
  let service: LandmarksService;
  let repository: Repository<Landmark>;

  const mockLandmarkList: Landmark[] = [
    {
      id: 1,
      name: 'Kasbah of Algiers',
      country: 'Algeria',
      location: 'Algiers',
      historical_context: null,
      year_built: null,
      architect: null,
      image_url: null,
      created_at: new Date('2024-01-31'),
      updated_at: new Date('2024-01-31'),
    },
    {
      id: 2,
      name: 'Timgad',
      country: 'Algeria',
      location: 'Batna Province',
      historical_context: null,
      year_built: null,
      architect: null,
      image_url: null,
      created_at: new Date('2024-01-31'),
      updated_at: new Date('2024-01-31'),
    },
  ];

  const expectedLandmark: Landmark = {
    id: 1,
    name: 'Test Landmark',
    country: 'Test Country',
    location: 'Test Location',
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LandmarksService,
        {
          provide: getRepositoryToken(Landmark),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<LandmarksService>(LandmarksService);
    repository = module.get<Repository<Landmark>>(getRepositoryToken(Landmark));
  });

  describe('update', () => {
    const landmarkId = 1;

    const existingLandmark: Landmark = {
      id: landmarkId,
      name: 'Test Landmark',
      country: 'Test Country',
      location: 'Test Location',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const updatedLandmark: Landmark = {
      ...existingLandmark,
    };
    it('should update a landmark', async () => {
      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(() => Promise.resolve(existingLandmark));
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(updatedLandmark));

      const result = await service.update(landmarkId, existingLandmark);

      expect(result).toEqual(updatedLandmark);
    });

    it('should throw NotFoundException when landmark not found', async () => {
      const landmarkId = 1;

      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(() => Promise.resolve(undefined));

      await expect(service.update(landmarkId, updatedLandmark)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a landmark', async () => {
      const landmarkId = 1;
      const existingLandmark: Landmark = {
        id: landmarkId,
        name: 'Test Landmark',
        country: 'Test Country',
        location: 'Test Location',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(() => Promise.resolve(existingLandmark));
      jest
        .spyOn(repository, 'remove')
        .mockImplementation(() => Promise.resolve(existingLandmark));

      const result = await service.remove(landmarkId);

      expect(result).toEqual(existingLandmark);
    });

    it('should throw NotFoundException when landmark not found', async () => {
      const landmarkId = 1;

      jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(() => Promise.resolve(undefined));

      await expect(service.remove(landmarkId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
