import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { Archiver } from './executables/archiver.executable';
import { Batcher } from './executables/batcher.executable';
import { Broadcaster } from './executables/broadcaster.executable';
import { CsvParser } from './executables/csv-parser.executable';
import { FileReader } from './executables/file-reader.executable';
import { FileWriter } from './executables/file-writer.executable';
import { Inspector } from './executables/inspector.executable';
import { LineSlicer } from './executables/line-slicer.executable';
import { Packer } from './executables/packer.executable';
import { StdoutWriter } from './executables/stdout-writer.executable';
import { Stringifier } from './executables/stringifier.executable';
import { PipelineExecutorService } from './pipeline-executor.service';

@Module({
  providers: [
    AppService,
    PipelineExecutorService,
    {
      provide: FileReader.name,
      useClass: FileReader,
    },
    {
      provide: LineSlicer.name,
      useClass: LineSlicer,
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
      provide: StdoutWriter.name,
      useClass: StdoutWriter,
    },
    {
      provide: FileWriter.name,
      useClass: FileWriter,
    },
    {
      provide: Archiver.name,
      useClass: Archiver,
    },
    {
      provide: Broadcaster.name,
      useClass: Broadcaster,
    },
    {
      provide: Inspector.name,
      useClass: Inspector,
    },
  ],
})
export class AppModule {}
