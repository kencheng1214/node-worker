import { z } from 'zod';
import { ArchiverSchema } from './operators/archiver/archiver.schema';
import { BatcherSchema } from './operators/batcher/batcher.schema';
import { BroadcasterSchema } from './operators/broadcaster/broadcaster.schema';
import { CsvParserSchema } from './operators/csv-parser/csv-parser.schema';
import { FileReaderSchema } from './operators/file-reader/file-reader.schema';
import { FileWriterSchema } from './operators/file-writer/file-writer.schema';
import { InspectorSchema } from './operators/inspector/inspector.schema';
import { LineSlicerSchema } from './operators/line-slicer/line-slicer.schema';
import { PackerSchema } from './operators/packer/packer.schema';
import { StdoutWriterSchema } from './operators/stdout-writer/stdout-writer.schema';
import { StringifierSchema } from './operators/stringifier/stringifier.schema';

export const SOURCE = [FileReaderSchema] as const;

export const TRANSFORM = [
  LineSlicerSchema,
  CsvParserSchema,
  StringifierSchema,
  BatcherSchema,
  PackerSchema,
  InspectorSchema,
] as const;

export const SINK = [StdoutWriterSchema, FileWriterSchema, ArchiverSchema] as const;

export const SpecificationSchema = z.object({
  pipeline: z.array(z.discriminatedUnion('name', [...SOURCE, ...TRANSFORM, ...SINK, BroadcasterSchema])),
});

export type Specification = z.infer<typeof SpecificationSchema>;

export interface PipelineContext {
  asOfDate: string;
}

export interface Executable<Input = unknown, Output = unknown, Options = Record<string, unknown>> {
  execute(input: Input, options?: Options, context?: PipelineContext): Output | Promise<Output>;
}
