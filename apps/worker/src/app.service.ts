import { Injectable } from '@nestjs/common';
import { Specification } from './app.interface';
import { PipelineExecutorService } from './pipeline-executor.service';

@Injectable()
export class AppService {
  constructor(private readonly pipelineExecutor: PipelineExecutorService) {}

  async run(specification: Specification) {
    await this.pipelineExecutor.runPipeline(specification.pipeline);
  }
}
