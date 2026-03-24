import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(AppService);

  await service.run(
    {
      pipeline: [
        { name: 'FileReader', options: { path: 'timezone.csv' } },
        { name: 'LineSlicer', options: { skipLast: 56 } },
        { name: 'CsvParser', options: { columns: true } },
        { name: 'Stringifier', options: { format: 'The timezone of {{Label}} is {{Value}}' } },
        {
          name: 'Broadcaster',
          options: {
            branches: [
              {
                pipeline: [
                  { name: 'Packer' },
                  {
                    name: 'FileWriter',
                    options: { path: 'timezone.txt' },
                  },
                ],
              },
              {
                pipeline: [
                  {
                    name: 'Batcher',
                    options: { size: 100 },
                  },
                  {
                    name: 'Archiver',
                    options: { path: 'timezone.zip', filename: 'timezone.{{index}}.txt' },
                  },
                ],
              },
            ],
          },
        },
        {
          name: 'Housekeeper',
          options: { pattern: 'timezone.{txt,zip}' },
        },
      ],
    },
    process.argv.slice(2),
  );
  await app.close();
}
bootstrap();
