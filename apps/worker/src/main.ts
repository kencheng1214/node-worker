import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(AppService);

  await service.run({
    pipeline: [
      { name: 'FilePresenceChecker', options: { path: 'package.json' } },
      { name: 'FileReader', options: { path: 'package.json' } },
      { name: 'FileWriter', options: { path: 'package2.json' } },
    ],
  });
  await app.close();
}
bootstrap();
