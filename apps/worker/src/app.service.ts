import { Injectable, Logger } from '@nestjs/common';
import dayjs from 'dayjs';
import Handlebars from 'handlebars';
import { PipelineContext, Specification } from './app.interface';
import { PipelineService } from './pipeline.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly pipelineService: PipelineService) {}

  async run(specification: Specification, args: string[]) {
    const startedAt = dayjs();
    const context: PipelineContext = {
      startedAt: startedAt.toDate(),
      render: function (template, data) {
        const { render, ...$ } = this as PipelineContext;

        return Handlebars.compile(template)({
          ...(data ?? {}),
          ...Object.fromEntries(args.map((arg, index) => [`$${++index}`, arg])),
          $,
        });
      },
    };

    this.logger.debug(context);
    await this.pipelineService.runPipeline(specification.pipeline, undefined, context);
  }
}
