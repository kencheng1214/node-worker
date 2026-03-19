import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { FilePresenceChecker } from './executables/file-presence-checker.executable';
import { FileReader } from './executables/file-reader.executable';

@Module({
  providers: [
    AppService,
    {
      provide: FilePresenceChecker.name,
      useClass: FilePresenceChecker,
    },
    {
      provide: FileReader.name,
      useClass: FileReader,
    },
  ],
})
export class AppModule {}
