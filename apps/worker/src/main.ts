import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(AppService);

  await service.run(
    {
      connections: {
        duckdb: { type: 'duckdb' },
      },
      pipeline: [
        {
          name: 'DuckDBTableInitializer',
          options: {
            connection: 'duckdb',
            schema: {
              label: 'VARCHAR',
              value: 'VARCHAR',
            },
          },
        },
        { name: 'PathGenerator', options: { pattern: ['*.csv'] } },
        {
          name: 'Iterator',
          options: {
            let: 'path',
            pipeline: [
              { name: 'FileReader', options: { path: '{{$.path}}' } },
              { name: 'LineSlicer', options: { skipLast: 1 } },
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
                          options: { path: '{{$.path}}.txt' },
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
                          options: { path: '{{$.path}}.zip', filename: 'timezone.{{index}}.txt' },
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          name: 'Housekeeper',
          options: { pattern: 'timezone?(-)*.@(txt|zip)' },
        },
      ],
    },
    process.argv.slice(2),
  );
  await app.close();
}
bootstrap();
