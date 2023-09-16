import { DictionaryDto } from '../../api';

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

  public setDictionaries(dictionaries: DictionaryDto[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS_MAP.dictionaries, JSON.stringify(dictionaries));
    } catch (error: unknown) {
      console.error(error);
    }
  }
}
