import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { FilePoller } from './file-poller';

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
