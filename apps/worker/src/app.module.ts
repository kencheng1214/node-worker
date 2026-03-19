import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { FilePoller } from './executables/file-poller.executable';
import { FileReader } from './executables/file-reader.executable';

@Module({
  providers: [
    AppService,
    {
      provide: FilePoller.name,
      useClass: FilePoller,
    },
    {
      provide: FileReader.name,
      useClass: FileReader,
    },
  ],
})
export class AppModule {}
