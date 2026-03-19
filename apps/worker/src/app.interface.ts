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
  options: z
    .object({
      parser: z.enum(['line', 'csv']).optional(),
    })
    .optional(),
});

export const SpecificationSchema = z.object({
  pipeline: z.array(z.discriminatedUnion('name', [FilePresenceCheckerSchema, FileReaderSchema])),
});

export type Specification = z.infer<typeof SpecificationSchema>;

export interface ExecutionContext {
  path?: string;
  readStream?: Readable;
  [key: string]: any;
}

export interface Executable {
  execute(context: ExecutionContext, options?: Record<string, any>): void | Promise<void>;
}
