import { EOL } from 'node:os';
import { Duplex, Transform } from 'node:stream';
import split from 'split2';

export function slice(options?: { head?: number; last?: number }) {
  const EOL_BUFFER = Buffer.from(EOL);
  const writable = split((string) => Buffer.from(string));
  const readable = Transform.from(async function* (lines: AsyncIterable<Buffer>) {
    const buffer: Buffer[] = [];
    let count = 0;

    for await (const line of lines) {
      if (count++ < (options?.head ?? 0)) continue;

      buffer.push(line);
      if (buffer.length > (options?.last ?? 0)) yield Buffer.concat([buffer.shift(), EOL_BUFFER]);
    }
  });

  writable.pipe(readable);

  return Duplex.from({ writable, readable });
}
