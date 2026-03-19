import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { FilePoller } from './executables/file-poller.executable';

@Module({
  providers: [
    AppService,
    {
      provide: FilePoller.name,
      useClass: FilePoller,
    },
  ],
})
export class AppModule {}
