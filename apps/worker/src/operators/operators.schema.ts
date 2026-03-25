import { z } from 'zod';
import { ArchiverSchema } from './archiver/archiver.schema';
import { BatcherSchema } from './batcher/batcher.schema';
import { BroadcasterSchema } from './broadcaster/broadcaster.schema';
import { CsvParserSchema } from './csv-parser/csv-parser.schema';
import { FileReaderSchema } from './file-reader/file-reader.schema';
import { FileWriterSchema } from './file-writer/file-writer.schema';
import { HousekeeperSchema } from './housekeeper/housekeeper.schema';
import { InspectorSchema } from './inspector/inspector.schema';
import { IteratorSchema } from './iterator/iterator.schema';
import { LineSlicerSchema } from './line-slicer/line-slicer.schema';
import { PackerSchema } from './packer/packer.schema';
import { PathGeneratorSchema } from './path-generator/path-generator.schema';
import { StdoutWriterSchema } from './stdout-writer/stdout-writer.schema';
import { StringifierSchema } from './stringifier/stringifier.schema';

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
      name: 'Iterator';
      options: {
        let?: string;
        pipeline: Operator[];
      };
    };

export const OperatorSchema: z.ZodType<Operator> = z.discriminatedUnion('name', [
  ArchiverSchema,
  BatcherSchema,
  BroadcasterSchema,
  CsvParserSchema,
  FileReaderSchema,
  FileWriterSchema,
  HousekeeperSchema,
  InspectorSchema,
  IteratorSchema,
  LineSlicerSchema,
  PackerSchema,
  PathGeneratorSchema,
  StdoutWriterSchema,
  StringifierSchema,
]);
