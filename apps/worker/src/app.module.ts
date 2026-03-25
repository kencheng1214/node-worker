import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { Archiver } from './operators/archiver/archiver';
import { Batcher } from './operators/batcher/batcher';
import { Broadcaster } from './operators/broadcaster/broadcaster';
import { CsvParser } from './operators/csv-parser/csv-parser';
import { DuckDBExecutor } from './operators/duckdb-executor/duckdb-executor';
import { FileReader } from './operators/file-reader/file-reader';
import { FileWriter } from './operators/file-writer/file-writer';
import { Housekeeper } from './operators/housekeeper/housekeeper';
import { Inspector } from './operators/inspector/inspector';
import { Iterator } from './operators/iterator/iterator';
import { LineSlicer } from './operators/line-slicer/line-slicer';
import { Packer } from './operators/packer/packer';
import { PathGenerator } from './operators/path-generator/path-generator';
import { StdoutWriter } from './operators/stdout-writer/stdout-writer';
import { Stringifier } from './operators/stringifier/stringifier';
import { PipelineService } from './pipeline.service';
import { registerHandlebars } from './utils/register-handlebars';
import { registerOperators } from './utils/register-operators';

@Module({
  providers: [
    AppService,
    PipelineService,
    ...registerOperators(
      Archiver,
      Batcher,
      Broadcaster,
      CsvParser,
      DuckDBExecutor,
      FileReader,
      FileWriter,
      Housekeeper,
      Inspector,
      Iterator,
      LineSlicer,
      Packer,
      PathGenerator,
      StdoutWriter,
      Stringifier,
    ),
  ],
})
export class AppModule {
  onModuleInit() {
    registerHandlebars();
  }
}
