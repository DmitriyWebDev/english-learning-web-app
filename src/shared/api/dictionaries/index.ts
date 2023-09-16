import { DictionaryPreviewDto } from './models';
import { AppDataStorage } from '../../lib/appDataStorage';

// const dictionariesPreviewList: DictionaryPreviewDto[] = [
//   {
//     id: '1',
//     title: 'Словарь 1',
//   },
//   {
//     id: '2',
//     title: 'Словарь 2',
//   },
//   {
//     id: '3',
//     title: 'Словарь 3',
//   },
//   {
//     id: '4',
//     title: 'Словарь 4',
//   },
//   {
//     id: '5',
//     title: 'Словарь 5',
//   },
//   {
//     id: '6',
//     title: 'Словарь 6',
//   },
//   {
//     id: '7',
//     title: 'Словарь 7',
//   },
//   {
//     id: '8',
//     title: 'Словарь 8',
//   },
// ];

const storage = AppDataStorage.getInstance();

export const getDictionariesPreviewList = async () =>
  new Promise<DictionaryPreviewDto[]>((resolve) => {
    resolve(storage.getDictionaries());
  });
