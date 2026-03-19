import { z } from 'zod';

export const SpecificationSchema = z.object({
  pipeline: z.array(z.object({ name: z.string(), options: z.record(z.string(), z.any()).optional() })).default([]),
});

export type Specification = z.infer<typeof SpecificationSchema>;

export interface ExecutionContext {
  [key: string]: any;
}

export interface Executable {
  execute(context: ExecutionContext, options?: Record<string, any>): void | Promise<void>;
}
