import { z } from 'zod';
import { ArchiverSchema } from './executables/archiver.schema';
import { BatcherSchema } from './executables/batcher.schema';
import { CsvParserSchema } from './executables/csv-parser.schema';
import { FileReaderSchema } from './executables/file-reader.schema';
import { FileWriterSchema } from './executables/file-writer.schema';
import { InspectorSchema } from './executables/inspector.schema';
import { PackerSchema } from './executables/packer.schema';
import { StringifierSchema } from './executables/stringifier.schema';
import { TrimmerSchema } from './executables/trimmer.schema';

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
