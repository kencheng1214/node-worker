import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Archiver,
  Batcher,
  Broadcaster,
  CsvParser,
  FileReader,
  FileWriter,
  Inspector,
  LineSlicer,
  Packer,
  StdoutWriter,
  Stringifier,
} from './operators';
import { PipelineExecutorService } from './pipeline-executor.service';

@Module({
  providers: [
    AppService,
    PipelineExecutorService,
    {
      provide: Archiver.name,
      useClass: Archiver,
    },
    {
      provide: Batcher.name,
      useClass: Batcher,
    },
    {
      provide: Broadcaster.name,
      useClass: Broadcaster,
    },
    {
      provide: CsvParser.name,
      useClass: CsvParser,
    },
    {
      provide: FileReader.name,
      useClass: FileReader,
    },
    {
      provide: FileWriter.name,
      useClass: FileWriter,
    },
    {
      provide: Inspector.name,
      useClass: Inspector,
    },
    {
      provide: LineSlicer.name,
      useClass: LineSlicer,
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
      provide: Stringifier.name,
      useClass: Stringifier,
    },
  ],
})
export class AppModule {}
