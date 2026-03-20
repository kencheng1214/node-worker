import { createReadStream } from 'node:fs';
import { Injectable } from '@nestjs/common';
import { Executable } from '../app.interface';

@Injectable()
export class FileReader implements Executable {
  execute(input: unknown, options?: { path: string }) {
    return createReadStream(options.path);
  }
}
