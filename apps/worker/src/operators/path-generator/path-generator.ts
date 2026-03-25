import { Injectable } from '@nestjs/common';
import { globStream } from 'glob';
import { Executable, PipelineContext } from '../../app.interface';
import { compile } from '../../utils/compile';
import { PathGeneratorOptions } from './path-generator.schema';

@Injectable()
export class PathGenerator implements Executable {
  execute(input: unknown, context: PipelineContext, options: PathGeneratorOptions) {
    const patterns = (Array.isArray(options.pattern) ? options.pattern : [options.pattern]).map((pattern) =>
      context.render(compile(pattern)),
    );

    return globStream(patterns);
  }
}
