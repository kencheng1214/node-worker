import { Injectable, Logger } from '@nestjs/common';
import dayjs from 'dayjs';
import { PipelineContext, Specification } from './app.interface';
import { PipelineService } from './services/pipeline.service';

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
        const { render, getConnectionOptions, ...$ } = this as PipelineContext;

        return template({ ...(data ?? {}), ...Object.fromEntries(args.map((arg, index) => [`$${++index}`, arg])), $ });
      },
    };

    this.logger.debug(context);
    if (specification.connections) this.logger.debug(specification.connections);
    await this.pipelineService.runPipeline(specification.pipeline, undefined, context);
  }
}
