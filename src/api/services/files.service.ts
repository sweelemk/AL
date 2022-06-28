import {http} from '../http';
import {AxiosResponse} from 'axios';
import {FilesServiceType} from './interfaces/files.interface';

export const getFiles = async (): Promise<FilesServiceType[]> =>
  http.get<FilesServiceType[]>('/intermediaries').then(({data}) => data);

export const addFile = async (file: FilesServiceType): Promise<AxiosResponse> =>
  http.post<FilesServiceType>('/files', file);

export const getFileByType = async (type: string): Promise<FilesServiceType> =>
  http
    .get<FilesServiceType[]>(`/intermediaries?type=${type}`)
    .then(({data}) => data[0]);
