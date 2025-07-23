import { readFile } from 'node:fs/promises';
import * as path from 'node:path';

export default async () => {
  const content = await readFile(path.resolve(process.cwd(), 'google_tokens.json'), 'utf-8').catch(() =>
    console.warn('Unable to read credentials file, please authenticate!')
  );

  if (!content) return {};

  return JSON.parse(content) as { accessToken: string; refreshToken: string };
};
