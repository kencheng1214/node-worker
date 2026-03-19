import { z } from 'zod';

export const FilePresenceCheckerSchema = z.object({
  name: z.literal('FilePresenceChecker'),
  options: z.object({
    file: z.string(),
    retries: z.number().optional(),
  }),
});

export const FileReaderSchema = z.object({
  name: z.literal('FileReader'),
  options: z.object({
    path: z.string(),
  }),
});

export const CsvParserSchema = z.object({
  name: z.literal('CsvParser'),
  options: z.object().optional(),
});

export const OracleLoaderSchema = z.object({
  name: z.literal('OracleLoader'),
  options: z.object().optional(),
});

export const SpecificationSchema = z.object({
  pipeline: z.array(
    z.discriminatedUnion('name', [FilePresenceCheckerSchema, FileReaderSchema, CsvParserSchema, OracleLoaderSchema]),
  ),
});

export type Specification = z.infer<typeof SpecificationSchema>;

export interface ExecutionContext {
  [key: string]: any;
}

export interface Executable {
  execute(context: ExecutionContext, options?: Record<string, any>): void | Promise<void>;
}
