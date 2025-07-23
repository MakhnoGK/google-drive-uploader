import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import googleConfig from '~/config/google.config';
import { AuthController } from '~/google/controllers/auth.controller';
import { GoogleAuthService } from '~/google/services/google-auth.service';
import { GoogleDriveFilesService } from '~/google/services/google-drive-files.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true, load: [googleConfig] })],
  providers: [ConfigService, GoogleAuthService, GoogleDriveFilesService, GoogleAuthGuard],
  exports: [GoogleDriveFilesService, GoogleAuthService, GoogleAuthGuard],
  controllers: [AuthController],
})
export class GoogleModule {}
