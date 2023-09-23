import { DictionaryDto, DictionaryDtoForCreation } from '../../api';
import { getUniqueId } from '../utils/generate/generate-utils';
import { cloneDeep } from 'lodash';

const STORAGE_KEYS_PREFIX = '@engLearnApp_';

const STORAGE_KEYS_MAP = {
  dictionaries: `${STORAGE_KEYS_PREFIX}dictionaries`,
} as const;

export class AppDataStorage {
  private static instance: AppDataStorage | null = null;

  private constructor() {
    // do nothing
  }

  public static getInstance(): AppDataStorage {
    if (!this.instance) {
      this.instance = new AppDataStorage();
    }
    return this.instance;
  }

  public getDictionary(id: DictionaryDto['id']): DictionaryDto {
    const dictionaries: DictionaryDto[] = this.getDictionaries();
    const targetDictionary = dictionaries.find((i) => i.id === id);

    if (!targetDictionary) {
      throw new Error(`Словарь с id - ${id} не найден`);
    }

    return targetDictionary;
  }

  public getDictionaries(): DictionaryDto[] {
    let dictionaries: DictionaryDto[] = [];

    try {
      const data = localStorage.getItem(STORAGE_KEYS_MAP.dictionaries);

      if (!data) return dictionaries;

      dictionaries = JSON.parse(data);
    } catch (error: unknown) {
      console.error(error);
    }

    return dictionaries;
  }

  public createDictionary(newDictionary: DictionaryDtoForCreation): void {
    if (!newDictionary.title) {
      throw new Error('Не заполнено название словаря');
    }

    const dictionaries: DictionaryDto[] = this.getDictionaries();
    const dictionaryForSave = { ...cloneDeep(newDictionary), id: getUniqueId() };

    const addDictionary = () => {
      dictionaries.push(dictionaryForSave);
      this.setDictionaries(dictionaries);
    };

    if (!dictionaries.length) {
      addDictionary();
      return;
    }

    const sameDictionary = dictionaries.find((i) => i.title === newDictionary.title);

    if (!sameDictionary) {
      addDictionary();
      return;
    }

    throw new Error('Такой словарь уже существует');
  }

  public updateDictionary(updatedDictionary: DictionaryDto): void {
    const dictionaries: DictionaryDto[] = this.getDictionaries();
    const targetIndex = dictionaries.findIndex((i) => i.id === updatedDictionary.id);

    if (targetIndex < 0) {
      throw new Error('Не найден словарь для обновления');
    }

    dictionaries[targetIndex] = updatedDictionary;

    this.setDictionaries(dictionaries);
  }

  public setDictionaries(dictionaries: DictionaryDto[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS_MAP.dictionaries, JSON.stringify(dictionaries));
    } catch (error: unknown) {
      console.error(error);
    }
  }
}
