import { z } from 'zod';
import { OperatorSchema } from './operators/operators.schema';

export const SpecificationSchema = z.object({
  pipeline: z.array(OperatorSchema),
});

export type Specification = z.infer<typeof SpecificationSchema>;

export interface PipelineContext {
  startedAt: Date;
  render: <T = unknown>(template: string, data?: T) => string;
  [key: string]: unknown;
}

export interface Executable<Input = unknown, Output = unknown, Options = Record<string, unknown>> {
  execute(input: Input, context: PipelineContext, options?: Options): Output | Promise<Output>;
}
