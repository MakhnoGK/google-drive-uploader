import { Transform } from 'node:stream';

export class CustomStreamChunkSizeTransform extends Transform {
  private buffer = Buffer.alloc(0);

  constructor(private readonly chunkSize: number) {
    super({
      readableHighWaterMark: chunkSize,
      writableHighWaterMark: chunkSize,
    });
  }

  _transform(incoming: Buffer, _encoding: BufferEncoding, callback: (err?: Error) => void) {
    this.buffer = Buffer.concat([this.buffer, incoming]);

    while (this.buffer.length >= this.chunkSize) {
      const slice = this.buffer.subarray(0, this.chunkSize);
      this.push(slice);
      this.buffer = this.buffer.subarray(this.chunkSize);
    }

    callback();
  }

  _flush(callback: (err?: Error) => void) {
    if (this.buffer.length > 0) {
      this.push(this.buffer);
    }

    callback();
  }
}
