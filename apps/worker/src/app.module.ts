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
import { SftpWriter } from './operators/sftp-writer/sftp-writer';
import { StdoutWriter } from './operators/stdout-writer/stdout-writer';
import { Stringifier } from './operators/stringifier/stringifier';
import { PipelineExecutorService } from './pipeline-executor.service';
import { registerOperators } from './utils/register-operators';

@Module({
  providers: [
    AppService,
    PipelineExecutorService,
    ...registerOperators(
      Archiver,
      Batcher,
      Broadcaster,
      CsvParser,
      FileReader,
      FileWriter,
      Inspector,
      LineSlicer,
      Packer,
      SftpWriter,
      StdoutWriter,
      Stringifier,
    ),
  ],
})
export class AppModule {}
