import { z } from 'zod';
import {
  ArchiverSchema,
  BatcherSchema,
  BroadcasterSchema,
  CsvParserSchema,
  FileReaderSchema,
  FileWriterSchema,
  InspectorSchema,
  LineSlicerSchema,
  PackerSchema,
  StdoutWriterSchema,
  StringifierSchema,
} from './operators';

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

export interface Executable<Input = unknown, Output = unknown, Options = Record<string, unknown>> {
  execute(input: Input, options?: Options): Output | Promise<Output>;
}
