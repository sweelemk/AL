import {FilesServiceType} from '../api/services/interfaces/files.interface';

export const filterData = (items: FilesServiceType[], type: string) => {
  return items.filter(item => item.type?.includes(type));
};
