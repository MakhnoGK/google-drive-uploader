import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from '~/files/entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST') as string,
        port: 5432,
        username: 'root',
        password: 'root',
        database: 'google-uploader',
        entities: [FileEntity],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
