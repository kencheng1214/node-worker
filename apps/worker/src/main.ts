import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(AppService);

  await service.run({
    pipeline: [
      { name: 'FileReader', options: { path: 'timezone.csv' } },
      { name: 'Trimmer', options: { end: 56 } },
      { name: 'CsvParser', options: { columns: true } },
      { name: 'Stringifier', options: { format: 'The timezone of {{Label}} is {{Value}}' } },
      { name: 'Batcher', options: { size: 200 } },
      { name: 'Inspector' },
      { name: 'Packer' },
      { name: 'FileWriter', options: { path: '' } },
    ],
  });
  await app.close();
}
bootstrap();
