import { Injectable } from '@nestjs/common';
import Client from 'ssh2-sftp-client';
import { Executable, PipelineContext } from '../../app.interface';
import { SftpWriterOptions } from './sftp-writer.schema';

@Injectable()
export class SftpWriter implements Executable {
  async execute(input: NodeJS.ReadableStream, context: PipelineContext, options: SftpWriterOptions) {
    const sftp = new Client();

    await sftp.connect(context.credentials[options.credential]);
    try {
    } catch (error) {
    } finally {
      await sftp.end();
    }
  }
}
