import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CsvParser } from './executables/csv-parser.executable';
import { FilePresenceChecker } from './executables/file-presence-checker.executable';
import { FileReader } from './executables/file-reader.executable';
import { OracleLoader } from './executables/oracle-loader.executable';

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
      provide: CsvParser.name,
      useClass: CsvParser,
    },
    {
      provide: OracleLoader.name,
      useClass: OracleLoader,
    },
  ],
})
export class AppModule {}
