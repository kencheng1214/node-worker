import { z } from 'zod';

export const FileReaderSchema = z.object({
  name: z.literal('FileReader'),
  options: z.object({
    path: z.string(),
  }),
});

export const TrimmerSchema = z.object({
  name: z.literal('Trimmer'),
  options: z
    .object({
      start: z.number().optional(),
      end: z.number().optional(),
    })
    .optional(),
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

export const BatcherSchema = z.object({
  name: z.literal('Batcher'),
  options: z
    .object({
      size: z.number().optional(),
    })
    .optional(),
});

export const PackerSchema = z.object({
  name: z.literal('Packer'),
  options: z.object().optional(),
});

export const ArchiverSchema = z.object({
  name: z.literal('Archiver'),
  options: z.object({
    path: z.string(),
    format: z.enum(['zip', 'tar']).optional(),
    filename: z.string().optional(),
  }),
});

export const FileWriterSchema = z.object({
  name: z.literal('FileWriter'),
  options: z.object({
    path: z.string(),
  }),
});

export const InspectorSchema = z.object({
  name: z.literal('Inspector'),
  options: z.object().optional(),
});

export const PipelineSchema = z.array(
  z.discriminatedUnion('name', [
    FileReaderSchema,
    TrimmerSchema,
    CsvParserSchema,
    StringifierSchema,
    BatcherSchema,
    PackerSchema,
    ArchiverSchema,
    FileWriterSchema,
    InspectorSchema,
  ]),
);

export const SpecificationSchema = z.object({
  pipeline: PipelineSchema,
});
