import { AppDataStorage } from '../index';
import { DictionaryDto } from '../../../api';

const dictionaryOne: DictionaryDto = {
  id: 'dictionary-1',
  title: 'Словарь №1',
  terms: [],
};

const dictionaryTwo: DictionaryDto = {
  ...dictionaryOne,
  id: 'dictionary-2',
  title: 'Словарь №2',
};

const dictionaryThree: DictionaryDto = {
  ...dictionaryOne,
  id: 'dictionary-3',
  title: 'Словарь №3',
};

describe('AppDataStorage.deleteDictionary()', () => {
  const resetStoreData = () => localStorage.clear();

  beforeEach(() => {
    resetStoreData();
    jest.clearAllMocks();
  });

  afterAll(() => {
    resetStoreData();
    jest.clearAllMocks();
  });

  describe('Valid cases', () => {
    it('Correctly deletes one dictionary', () => {
      const storage = AppDataStorage.getInstance();

      storage.setDictionaries([dictionaryOne, dictionaryTwo, dictionaryThree]);

      storage.deleteDictionary(dictionaryTwo.id);

      expect(storage.getDictionaries()).toStrictEqual([dictionaryOne, dictionaryThree]);
    });
  });

  describe('Invalid cases', () => {
    it('Does not delete a dictionary if it does not exist', () => {
      const storage = AppDataStorage.getInstance();

      storage.setDictionaries([]);

      expect(() => {
        storage.deleteDictionary('');
      }).toThrowError(new Error('Не найден словарь для удаления'));
    });
  });
});
