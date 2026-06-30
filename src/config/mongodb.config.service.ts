import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongoDBConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const host = this.configService.get<string>('DB_HOST');
    const port = this.configService.get<number>('DB_MONGO_PORT');
    const username = this.configService.get<string>('DB_USERNAME');
    const password = this.configService.get<string>('DB_PASSWORD');
    const database = this.configService.get<string>('DB_MONGO_NAME');

    const uri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

    return {
      uri,
    };
  }
}