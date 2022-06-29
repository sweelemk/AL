import {DocumentPickerResponse} from 'react-native-document-picker';

type MergeTypes<A, B> = {
  [key in keyof A]: key extends keyof B ? B[key] : A[key];
} & B;

export type FilesServiceType = MergeTypes<
  {id?: string},
  DocumentPickerResponse
>;
