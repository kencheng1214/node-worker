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
