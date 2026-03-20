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
    trim: z
      .object({
        start: z.number().optional(),
        end: z.number().optional(),
      })
      .optional(),
  }),
});

export const CsvParserSchema = z.object({
  name: z.literal('CsvParser'),
  options: z
    .object({
      columns: z.union([z.boolean(), z.array(z.string())]).optional(),
    })
    .optional(),
});

export const StringifierSchema = z.object({
  name: z.literal('Stringifier'),
  options: z
    .object({
      format: z.string().optional(),
    })
    .optional(),
});

export const FileWriterSchema = z.object({
  name: z.literal('FileWriter'),
  options: z.object({
    path: z.string(),
    buffer: z
      .object({
        size: z.number().optional(),
      })
      .optional(),
  }),
});

export const OracleLoaderSchema = z.object({
  name: z.literal('OracleLoader'),
  options: z.object().optional(),
});

export const SpecificationSchema = z.object({
  pipeline: z.array(
    z.discriminatedUnion('name', [
      FilePresenceCheckerSchema,
      FileReaderSchema,
      CsvParserSchema,
      StringifierSchema,
      FileWriterSchema,
      OracleLoaderSchema,
    ]),
  ),
});

export type Specification = z.infer<typeof SpecificationSchema>;

export interface ExecutionContext {
  [key: string]: any;
}

export interface Executable {
  execute(context: ExecutionContext, options?: Record<string, any>): void | Promise<void>;
}
