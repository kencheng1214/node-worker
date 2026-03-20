import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(AppService);

  await service.run({
    pipeline: [
      { name: 'FilePresenceChecker', options: { file: 'timezone.csv' } },
      { name: 'FileReader', options: { path: 'timezone.csv', trim: { end: 56 } } },
      { name: 'CsvParser', options: { columns: true } },
      { name: 'Stringifier', options: { format: 'The timezone of {{Label}} is {{Value}}' } },
      { name: 'FileWriter', options: { path: 'timezone.txt.{{index}}', buffer: { size: 1000 } } },
    ],
  });
  await app.close();
}
bootstrap();
