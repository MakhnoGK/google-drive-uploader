export type ResumableUploadOptions = {
  accessToken: string;
  filename: string;
  contentLength: number;
};

export type ResumableUploadCompleteResponse = {
  id: string;
  name: string;
  mimeType: string;
  kind: string;
};

