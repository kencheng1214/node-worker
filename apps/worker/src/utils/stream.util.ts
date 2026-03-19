import { EOL } from 'node:os';
import { Transform } from 'node:stream';
import pumpify from 'pumpify';
import split from 'split2';

export function trim(options?: { start?: number; end?: number }) {
  const EOL_BUFFER = Buffer.from(EOL);
  const { start = 0, end = 0 } = options ?? {};
  const writable = split((string) => Buffer.from(string));
  const readable = Transform.from(async function* (lines: AsyncIterable<Buffer>) {
    const buffer: Buffer[] = [];
    let count = 0;

    for await (const line of lines) {
      if (count++ < start) continue;

      buffer.push(line);
      if (buffer.length > end) yield Buffer.concat([buffer.shift(), EOL_BUFFER]);
    }
  });

  return pumpify(writable, readable);
}
