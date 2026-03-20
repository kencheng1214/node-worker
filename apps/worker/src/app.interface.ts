import { z } from 'zod';
import { ArchiverSchema } from './executables/archiver.schema';
import { BatcherSchema } from './executables/batcher.schema';
import { CsvParserSchema } from './executables/csv-parser.schema';
import { FileReaderSchema } from './executables/file-reader.schema';
import { FileWriterSchema } from './executables/file-writer.schema';
import { InspectorSchema } from './executables/inspector.schema';
import { PackerSchema } from './executables/packer.schema';
import { StdoutWriterSchema } from './executables/stdout-writer.schema';
import { StringifierSchema } from './executables/stringifier.schema';
import { TrimmerSchema } from './executables/trimmer.schema';

export const SpecificationSchema = z.object({
  pipeline: z.array(
    z.discriminatedUnion('name', [
      FileReaderSchema,
      TrimmerSchema,
      CsvParserSchema,
      StringifierSchema,
      BatcherSchema,
      PackerSchema,
      StdoutWriterSchema,
      ArchiverSchema,
      FileWriterSchema,
      InspectorSchema,
    ]),
  ),
});

export type Specification = z.infer<typeof SpecificationSchema>;

export interface Executable<Input = unknown, Output = unknown, Options = Record<string, unknown>> {
  execute(input: Input, options?: Options): Output | Promise<Output>;
}
