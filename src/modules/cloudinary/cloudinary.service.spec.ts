import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryService } from './cloudinary.service';
import { v2 as cloudinary } from 'cloudinary';

jest.mock('cloudinary', () => ({
  v2: {
    uploader: {
      upload_stream: jest.fn().mockImplementation((options, callback) => {
        callback(null, { url: 'test-url' });
      }),
    },
  },
}));

describe('CloudinaryService', () => {
  let service: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudinaryService],
    }).compile();

    service = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload image', async () => {
    const mockFile = { buffer: Buffer.from('test') } as Express.Multer.File;
    const result = await service.uploadImage(mockFile);
    expect(result.url).toBe('test-url');
  });

  it('should handle upload errors', async () => {
    (cloudinary.uploader.upload_stream as jest.Mock).mockImplementationOnce(
      (options, callback) => {
        callback(new Error('Upload error'), null);
      },
    );

    const mockFile = { buffer: Buffer.from('test') } as Express.Multer.File;
    await expect(service.uploadImage(mockFile)).rejects.toThrow('Upload error');
  });
});
