import { DictionaryDto, DictionaryDtoForCreation, DictionaryPreviewDto } from './models';
import { AppDataStorage } from '../../lib/appDataStorage';

const storage = AppDataStorage.getInstance();

export const getDictionariesPreviewList = async () =>
  new Promise<DictionaryPreviewDto[]>((resolve) => {
    resolve(storage.getDictionaries());
  });

export const createDictionary = async (data: DictionaryDtoForCreation) =>
  new Promise<void>((resolve) => {
    resolve(storage.createDictionary(data));
  });

export const updateDictionary = async (data: DictionaryDto) =>
  new Promise<void>((resolve) => {
    resolve(storage.updateDictionary(data));
  });

export const deleteDictionary = async (id: DictionaryDto['id']) =>
  new Promise<void>((resolve) => {
    resolve(storage.deleteDictionary(id));
  });

export const getDictionaryForEdit = async (id: DictionaryDto['id']) =>
  new Promise<DictionaryPreviewDto>((resolve) => {
    resolve(storage.getDictionary(id));
  });
