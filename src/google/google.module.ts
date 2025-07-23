import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleAuthService } from '~/google/services/google-auth.service';
import { GoogleDriveFilesService } from '~/google/services/google-drive-files.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [ConfigService, GoogleAuthService, GoogleDriveFilesService],
  exports: [GoogleDriveFilesService],
})
export class GoogleModule {}
