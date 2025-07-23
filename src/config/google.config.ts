import { readFile } from 'node:fs/promises';
import { CREDENTIALS_FILE_PATH } from '~/google/constants';
import { CredentialsDto } from '~/google/dto/credentials.dto';

export default async () => {
  const content = await readFile(CREDENTIALS_FILE_PATH, 'utf-8').catch(() =>
    console.warn('Unable to read credentials file, please authenticate!')
  );

  if (!content) return {};

  return CredentialsDto.fromPlain(JSON.parse(content) as object);
};
