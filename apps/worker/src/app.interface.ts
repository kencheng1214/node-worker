import { z } from 'zod';
import { ArchiverSchema } from './operators/archiver/archiver.schema';
import { BatcherSchema } from './operators/batcher/batcher.schema';
import { BroadcasterSchema } from './operators/broadcaster/broadcaster.schema';
import { CsvParserSchema } from './operators/csv-parser/csv-parser.schema';
import { FileReaderSchema } from './operators/file-reader/file-reader.schema';
import { FileWriterSchema } from './operators/file-writer/file-writer.schema';
import { HousekeeperSchema } from './operators/housekeeper/housekeeper.schema';
import { InspectorSchema } from './operators/inspector/inspector.schema';
import { LineSlicerSchema } from './operators/line-slicer/line-slicer.schema';
import { PackerSchema } from './operators/packer/packer.schema';
import { PathGeneratorSchema } from './operators/path-generator/path-generator.schema';
import { StdoutWriterSchema } from './operators/stdout-writer/stdout-writer.schema';
import { StringifierSchema } from './operators/stringifier/stringifier.schema';

export const SOURCE = [FileReaderSchema, PathGeneratorSchema] as const;

export const TRANSFORM = [
  BatcherSchema,
  CsvParserSchema,
  InspectorSchema,
  LineSlicerSchema,
  PackerSchema,
  StringifierSchema,
] as const;

export const SINK = [ArchiverSchema, FileWriterSchema, StdoutWriterSchema] as const;

export const CONTROL_FLOW = [BroadcasterSchema] as const;

export const POST_ACTION = [HousekeeperSchema] as const;

export const SpecificationSchema = z.object({
  pipeline: z.array(z.discriminatedUnion('name', [...SOURCE, ...TRANSFORM, ...SINK, ...CONTROL_FLOW, ...POST_ACTION])),
});

export type Specification = z.infer<typeof SpecificationSchema>;

export interface PipelineContext {
  startedAt: Date;
  [key: string]: unknown;
}

export interface Executable<Input = unknown, Output = unknown, Options = Record<string, unknown>> {
  execute(input: Input, context: PipelineContext, options?: Options): Output | Promise<Output>;
}
