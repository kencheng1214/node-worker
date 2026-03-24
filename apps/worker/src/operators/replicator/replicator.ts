import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext } from '../../app.interface';
import { ReplicatorOptions } from './replicator.schema';

@Injectable()
export class Replicator implements Executable {
  execute(input: NodeJS.ReadableStream, context: PipelineContext, options?: ReplicatorOptions) {
    return input;
  }
}
