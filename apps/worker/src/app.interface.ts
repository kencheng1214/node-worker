import { z } from 'zod';

export const FilePollerSchema = z.object({
  name: z.literal('FilePoller'),
  options: z.object({
    path: z.string(),
    retries: z.number().optional(),
  }),
});

export const SpecificationSchema = z.object({
  pipeline: z.array(z.discriminatedUnion('name', [FilePollerSchema])).default([]),
});

export type Specification = z.infer<typeof SpecificationSchema>;

export interface ExecutionContext {
  [key: string]: any;
}

export interface Executable {
  execute(context: ExecutionContext, options?: Record<string, any>): void | Promise<void>;
}
