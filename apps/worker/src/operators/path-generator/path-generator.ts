import { Injectable } from '@nestjs/common';
import { globStream } from 'glob';
import { Executable, PipelineContext } from '../../app.interface';
import { PathGeneratorOptions } from './path-generator.schema';

@Injectable()
export class PathGenerator implements Executable {
  async execute(input: unknown, context: PipelineContext, options: PathGeneratorOptions) {
    return globStream(options.pattern);
  }
}
