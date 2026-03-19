import { z } from 'zod';

export const SpecificationSchema = z.object({ pipeline: z.array(z.string()).default([]) });

export type Specification = z.infer<typeof SpecificationSchema>;

export interface ExecutionContext {}

export interface Executable {
  execute(context: ExecutionContext): Promise<void>;
}
