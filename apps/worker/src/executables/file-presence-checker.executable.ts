import { access } from 'node:fs/promises';
import { Injectable } from '@nestjs/common';
import pRetry from 'p-retry';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class FilePresenceChecker implements Executable {
  async execute(context: ExecutionContext, options: { file: string; retries?: number }) {
    await pRetry(() => access(options.file), { retries: options.retries ?? 0 });
  }
}
