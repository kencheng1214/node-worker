import { EOL } from 'node:os';
import { Transform } from 'node:stream';
import pumpify from 'pumpify';
import split from 'split2';

export function trim(options?: { start?: number; end?: number }) {
  const EOL_BUFFER = Buffer.from(EOL);
  const { start = 0, end = 0 } = options ?? {};
  const writable = split((string) => Buffer.from(string));
  const readable = Transform.from(async function* (lines: AsyncIterable<Buffer>) {
    const window: Buffer[] = [];
    let index = 0;

    for await (const line of lines) {
      if (index++ < start) continue;

      window.push(line);
      if (window.length > end) yield Buffer.concat([window.shift(), EOL_BUFFER]);
    }
  });

  return pumpify(writable, readable);
}

export function buffer(options?: { size?: number }) {
  const EOL_BUFFER = Buffer.from(EOL);
  const size = options?.size ?? 0;
  let buffer: Buffer[] = [];

  return Transform.from(async function* (lines: AsyncIterable<Buffer>) {
    for await (const line of lines) {
      const chunk = Buffer.concat([Buffer.from(line), EOL_BUFFER]);

      if (size <= 0) {
        yield chunk;
        continue;
      }

      buffer.push(chunk);
      if (buffer.length === size) {
        yield Buffer.concat(buffer);
        buffer = [];
      }
    }
    if (buffer.length > 0) yield Buffer.concat(buffer);
  });
}
