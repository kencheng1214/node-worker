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
      { name: 'Packer' },
      {
        name: 'Broadcaster',
        options: {
          pipeline: [
            {
              name: 'FileWriter',
              options: { path: 'timezone.txt' },
            },
            {
              name: 'Archiver',
              options: { path: 'timezone.zip' },
            },
          ],
        },
      },
    ],
  });
  await app.close();
}
bootstrap();
