import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { Archiver } from './operators/archiver/archiver';
import { Batcher } from './operators/batcher/batcher';
import { Broadcaster } from './operators/broadcaster/broadcaster';
import { CsvParser } from './operators/csv-parser/csv-parser';
import { FileReader } from './operators/file-reader/file-reader';
import { FileWriter } from './operators/file-writer/file-writer';
import { Inspector } from './operators/inspector/inspector';
import { LineSlicer } from './operators/line-slicer/line-slicer';
import { Packer } from './operators/packer/packer';
import { StdoutWriter } from './operators/stdout-writer/stdout-writer';
import { Stringifier } from './operators/stringifier/stringifier';
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
