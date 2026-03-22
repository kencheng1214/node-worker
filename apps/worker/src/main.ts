import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(AppService);

  await service.run({
    pipeline: [
      { name: 'FileReader', options: { path: 'timezone.csv' } },
      { name: 'LineSlicer', options: { last: 56 } },
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
              pipeline: [{ name: 'StdoutWriter' }],
            },
          ],
        },
      },
    ],
  });
  await app.close();
}
bootstrap();
