import { Injectable, Logger } from '@nestjs/common';
import dayjs from 'dayjs';
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
      connections: specification.connections,
      render: function (template, data) {
        const { render, ...$ } = this as PipelineContext;

        return template({ ...(data ?? {}), ...Object.fromEntries(args.map((arg, index) => [`$${++index}`, arg])), $ });
      },
    };

    this.logger.debug(context);
    await this.pipelineService.runPipeline(specification.pipeline, undefined, context);
  }
}
