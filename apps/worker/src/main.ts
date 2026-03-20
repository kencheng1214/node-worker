import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(AppService);

  await service.run({
    pipeline: [
      { name: 'FilePresenceChecker', options: { file: 'timezone.csv' } },
      { name: 'FileReader', options: { path: 'timezone.csv' } },
      { name: 'CsvParser', options: { columns: true, trim: { end: 56 } } },
      { name: 'Stringifier', options: { format: 'The timezone of {{Label}} is {{Value}}' } },
      { name: 'OracleLoader' },
    ],
  });
  await app.close();
}
bootstrap();
