import { Inject, Injectable } from '@nestjs/common';
import { ResourceEntity } from './entity/resources.entity';
import { UserResourceEntity } from './entity/user-resouce.entity';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class ResourcesService {
  constructor(
    @Inject('USER_RESOURCE_REPOSITORY')
    private readonly userResourceRepository: typeof UserResourceEntity,
    @Inject('RESOURCE_REPOSITORY')
    private readonly resourceRepository: typeof ResourceEntity,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadVideo(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'videos',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      toStream(file.buffer).pipe(uploadStream);
    });
  }

  async createResource(file: Express.Multer.File, userID: number) {
    try {
      let fileUrl = null;
      const x = file.mimetype.split('/');
      if (x[0] === 'video') {
        fileUrl = await this.uploadVideo(file);
      } else {
        fileUrl = await this.uploadImage(file);
      }

      const resource = await this.resourceRepository.build({
        fileType: fileUrl['resource_type'],
        fileUrl: fileUrl['secure_url'],
      });

      await resource.save();

      const user_resource = await this.userResourceRepository.build({
        userId: userID,
        resourceId: resource.id,
      });

      await user_resource.save();

      const dataResponse = {
        ...resource['dataValues'],
        ...user_resource['dataValues'],
      };

      return {
        status: {
          success: true,
          code: 201,
          message: 'Create Data Successfuly',
        },
        data: dataResponse,
      };
    } catch (error) {
      return {
        status: {
          success: false,
          code: 400,
          message: error.message,
        },
      };
    }
  }
}
