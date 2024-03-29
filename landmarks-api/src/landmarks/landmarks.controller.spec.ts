import { Test, TestingModule } from '@nestjs/testing';
import { LandmarksController } from './landmarks.controller';
import { LandmarksService } from './landmarks.service';

import { Landmark } from './entities/landmark.entity';

describe('LandmarksController', () => {
  let controller: LandmarksController;

  const mockLandmarkList = [
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

  const mockLandmark = {
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
  };

  const mockLandmarkService = {
    findAll: () => mockLandmarkList,
    findOne: (id: string) => mockLandmark,
    create: (landmark: Landmark) => mockLandmark,
    update: async (id: string, landmark: Landmark) => mockLandmark,
    remove: async (id: string) => mockLandmark,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandmarksController],
      providers: [LandmarksService],
    })
      .overrideProvider(LandmarksService)
      .useValue(mockLandmarkService)
      .compile();

    controller = module.get<LandmarksController>(LandmarksController);
  });

  describe('findAll', () => {
    it('should return an array of landmarks', () => {
      expect(controller).toBeDefined();
      expect(controller.findAll()).toBe(mockLandmarkList);
    });
  });

  describe('createLandmark', () => {
    it('should create a new landmark', async () => {
      expect(await controller.createLandmark(mockLandmark)).toBe(mockLandmark);
    });
  });

  describe('findOne', () => {
    it('should return a specific landmark', async () => {
      const landmarkId = '1';

      expect(await controller.findOne(landmarkId)).toBe(mockLandmark);
    });
  });

  describe('update', () => {
    it('should update a landmark', async () => {
      const landmarkId = '1';

      expect(await controller.update(landmarkId, mockLandmark)).toBe(
        mockLandmark,
      );
    });
  });

  describe('remove', () => {
    it('should remove a landmark', async () => {
      const landmarkId = '1';

      expect(await controller.remove(landmarkId)).toBe(mockLandmark);
    });
  });
});
