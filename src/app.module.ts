import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { ProdutoModule } from './model/produto/produto.module';
import { MongoDBConfigService } from './config/mongodb.config.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ProdutoModule ,
    ConfigModule.forRoot({
    isGlobal : true
  }),
    TypeOrmModule.forRootAsync(
    {
    useClass : PostgresConfigService,
    inject : [PostgresConfigService]
  }),

  MongooseModule.forRootAsync({
    useClass: MongoDBConfigService,
    inject: [MongoDBConfigService],
    }),

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
