import { access } from 'node:fs/promises';
import { Injectable, Logger } from '@nestjs/common';
import pRetry from 'p-retry';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class FilePresenceChecker implements Executable {
  private readonly logger = new Logger(FilePresenceChecker.name);

  async execute(context: ExecutionContext, options: { path: string; retries?: number }) {
    await pRetry(() => access(options.path), { retries: options.retries ?? 0 });
  }
}
