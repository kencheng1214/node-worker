import { Injectable } from '@nestjs/common';
import { Executable, ExecutionContext } from '../app.interface';

@Injectable()
export class FileWriter implements Executable {
  async execute(context: ExecutionContext, options: { path: string }) {
    for await (const chunk of context.readStream) console.log(String(chunk));
  }
}
