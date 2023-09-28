import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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

  async uploadFiles(
    file: Express.Multer.File,
    fileExtention: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          resource_type: fileExtention === 'image' ? 'image' : 'video',
          folder: 'files',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }

  async createResource(file: Express.Multer.File, userID: number) {
    try {
      let fileUrl = null;
      const x = file.mimetype.split('/');
      if (x[0] === 'video') {
        fileUrl = await this.uploadFiles(file, x[0]);
      } else {
        fileUrl = await this.uploadFiles(file, x[0]);
      }

      const resource = await this.resourceRepository.build({
        file_type: fileUrl['resource_type'],
        file_url: fileUrl['secure_url'],
        file_name: file.originalname,
        mim_type: file.mimetype,
        file_size: `${file.size} bytes`,
      });

      await resource.save();

      const user_resource = await this.userResourceRepository.build({
        user_id: userID,
        resource_id: resource.id,
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

  async findAllResource(userId: number) {
    try {
      const userResourceList = await this.userResourceRepository.findAll({
        where: { user_id: userId },
        include: ['resource'],
      });

      return {
        status: {
          success: true,
          code: 200,
          message: 'Get All Data Successfuly',
        },
        data: userResourceList,
      };
    } catch (error) {
      throw new HttpException('something want wrong!', HttpStatus.BAD_REQUEST);
    }
  }
}
