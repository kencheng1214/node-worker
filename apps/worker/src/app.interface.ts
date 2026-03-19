import { Readable } from 'stream';
import { z } from 'zod';

export const FilePresenceCheckerSchema = z.object({
  name: z.literal('FilePresenceChecker'),
  options: z.object({
    path: z.string(),
    retries: z.number().optional(),
  }),
});

export const FileReaderSchema = z.object({
  name: z.literal('FileReader'),
  options: z.object({
    path: z.string(),
    format: z.enum(['plain', 'csv']).optional(),
  }),
});

export const SpecificationSchema = z.object({
  pipeline: z.array(z.discriminatedUnion('name', [FilePresenceCheckerSchema, FileReaderSchema])),
});

export type Specification = z.infer<typeof SpecificationSchema>;

export interface ExecutionContext {
  [key: string]: any;
}

export interface Executable {
  execute(context: ExecutionContext, options?: Record<string, any>): void | Promise<void>;
}
