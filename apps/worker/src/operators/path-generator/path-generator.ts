import { Injectable } from '@nestjs/common';
import { Executable, PipelineContext } from '../../app.interface';
import { PathGeneratorOptions } from './path-generator.schema';

@Injectable()
export class PathGenerator implements Executable {
  execute(input: unknown, context: PipelineContext, options?: PathGeneratorOptions) {}
}
