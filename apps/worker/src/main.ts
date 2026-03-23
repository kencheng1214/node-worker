import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(AppService);

  await service.run({
    credentials: {
      sftp: { host: 'localhost', port: 2222, username: 'user', password: 'pass' },
    },
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
            {
              pipeline: [
                {
                  name: 'Packer',
                },
                {
                  name: 'SftpWriter',
                  options: { credential: 'sftp' },
                },
              ],
            },
          ],
        },
      },
    ],
  });
  await app.close();
}
bootstrap();
