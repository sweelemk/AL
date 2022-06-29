import {DocumentPickerResponse} from 'react-native-document-picker';

type MergeTypes<A, B> = {
  [key in keyof A]: key extends keyof B ? B[key] : A[key];
} & B;

type BaseFileType = {
  id?: string;
  total?: number;
};

export type FilesServiceType = MergeTypes<BaseFileType, DocumentPickerResponse>;
