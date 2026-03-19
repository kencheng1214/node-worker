import { access } from 'node:fs/promises';
import { Injectable, Logger } from '@nestjs/common';
import pRetry from 'p-retry';
import { Executable, ExecutionContext } from './app.interface';

@Injectable()
export class FilePoller implements Executable {
  private readonly logger = new Logger(FilePoller.name);

  async execute(context: ExecutionContext, options: { path: string; retries?: number }) {
    await pRetry(() => access(options.path), { retries: options.retries ?? 0 });
  }
}
