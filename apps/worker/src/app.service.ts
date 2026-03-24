import { Injectable, Logger } from '@nestjs/common';
import dayjs from 'dayjs';
import { PipelineContext, Specification } from './app.interface';
import { PipelineExecutorService } from './pipeline-executor.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly pipelineExecutor: PipelineExecutorService) {}

  async run(specification: Specification, args: string[]) {
    const startedAt = dayjs();
    const context: PipelineContext = {
      startedAt: startedAt.toDate(),
      ...Object.fromEntries(args.map((arg, index) => [`$${++index}`, arg])),
    };

    this.logger.debug(context);
    await this.pipelineExecutor.runPipeline(specification.pipeline, undefined, context);
  }
}
