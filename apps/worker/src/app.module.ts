import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { Archiver } from './executables/archiver.executable';
import { Batcher } from './executables/batcher.executable';
import { CsvParser } from './executables/csv-parser.executable';
import { FilePresenceChecker } from './executables/file-presence-checker.executable';
import { FileReader } from './executables/file-reader.executable';
import { FileWriter } from './executables/file-writer.executable';
import { Inspector } from './executables/inspector.executable';
import { Packer } from './executables/packer.executable';
import { Stringifier } from './executables/stringifier.executable';
import { Trimmer } from './executables/trimmer.executable';

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
    {
      provide: Trimmer.name,
      useClass: Trimmer,
    },
    {
      provide: CsvParser.name,
      useClass: CsvParser,
    },
    {
      provide: Stringifier.name,
      useClass: Stringifier,
    },
    {
      provide: Batcher.name,
      useClass: Batcher,
    },
    {
      provide: Packer.name,
      useClass: Packer,
    },
    {
      provide: Archiver.name,
      useClass: Archiver,
    },
    {
      provide: FileWriter.name,
      useClass: FileWriter,
    },
    {
      provide: Inspector.name,
      useClass: Inspector,
    },
  ],
})
export class AppModule {}
