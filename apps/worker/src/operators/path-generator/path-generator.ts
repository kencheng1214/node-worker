import { Injectable } from '@nestjs/common';
import { globStream } from 'glob';
import { Executable, PipelineContext } from '../../app.interface';
import { compile } from '../../utils/compile';
import { PathGeneratorOptions } from './path-generator.schema';

@Injectable()
export class PathGenerator implements Executable {
  execute(input: unknown, context: PipelineContext, options: PathGeneratorOptions) {
    const { PATTERN_TEMPLATE } = compile(context, options, ['pattern']);

    return globStream(PATTERN_TEMPLATE());
  }
}
