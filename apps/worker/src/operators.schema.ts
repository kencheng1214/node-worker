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
import { ReplicatorSchema } from './operators/replicator/replicator.schema';
import { StdoutWriterSchema } from './operators/stdout-writer/stdout-writer.schema';
import { StringifierSchema } from './operators/stringifier/stringifier.schema';

export type Operator =
  | z.infer<typeof ArchiverSchema>
  | z.infer<typeof BatcherSchema>
  | z.infer<typeof CsvParserSchema>
  | z.infer<typeof FileReaderSchema>
  | z.infer<typeof FileWriterSchema>
  | z.infer<typeof HousekeeperSchema>
  | z.infer<typeof InspectorSchema>
  | z.infer<typeof LineSlicerSchema>
  | z.infer<typeof PackerSchema>
  | z.infer<typeof PathGeneratorSchema>
  | z.infer<typeof StdoutWriterSchema>
  | z.infer<typeof StringifierSchema>
  | {
      name: 'Broadcaster';
      options: {
        branches: { pipeline: Operator[] }[];
      };
    }
  | {
      name: 'Replicator';
      options: {
        pipeline: Operator[];
      };
    };

export const OperatorSchema: z.ZodType<Operator> = z.discriminatedUnion('name', [
  ArchiverSchema,
  BatcherSchema,
  CsvParserSchema,
  FileReaderSchema,
  FileWriterSchema,
  HousekeeperSchema,
  InspectorSchema,
  LineSlicerSchema,
  PackerSchema,
  PathGeneratorSchema,
  StdoutWriterSchema,
  StringifierSchema,
  BroadcasterSchema,
  ReplicatorSchema,
]);
