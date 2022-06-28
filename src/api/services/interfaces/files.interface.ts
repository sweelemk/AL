export type FileType = 'png' | 'csv';

export type FilesServiceType = {
  id: string;
  name: string;
  path: string;
  type: FileType;
};
