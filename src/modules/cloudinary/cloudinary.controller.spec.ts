import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';

describe('CloudinaryController', () => {
  let controller: CloudinaryController;
  let service: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CloudinaryController],
      providers: [
        {
          provide: CloudinaryService,
          useValue: {
            uploadImage: jest.fn().mockResolvedValue({ url: 'test-url' }), // Mockea el valor
          },
        },
      ],
    }).compile();

    controller = module.get<CloudinaryController>(CloudinaryController);
    service = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call CloudinaryService to upload image', async () => {
    const mockFile = { buffer: Buffer.from('test') } as Express.Multer.File;

    // Llama al método del controlador
    const result = await controller.uploadImage(mockFile);

    expect(service.uploadImage).toHaveBeenCalledWith(mockFile);

    expect(result).toEqual({ imageUrl: 'test-url' });
  });
});
