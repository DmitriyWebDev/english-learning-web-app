import { AppDataStorage } from '../index';
import * as getUniqueIdModule from '../../utils/generate/generate-utils';
import { DictionaryDto, DictionaryDtoForCreation } from '../../../api';
import Mock = jest.Mock;

const newDictionary: DictionaryDtoForCreation = {
  title: 'Словарь №1',
  terms: [
    {
      orderNumber: 1,
      value: 'Кошка',
      valueTranslated: 'Cat',
    },
  ],
};

describe('AppDataStorage.createDictionary()', () => {
  const uniqueIdMock = 'mock-id-1';
  const getUniqueIdMock = jest.fn(() => uniqueIdMock);
  const resetStoreData = () => localStorage.clear();

  (getUniqueIdModule.getUniqueId as Mock) = getUniqueIdMock;

  beforeEach(() => {
    resetStoreData();
    jest.clearAllMocks();
  });

  afterAll(() => {
    resetStoreData();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('Valid cases', () => {
    it('Correctly saves a new dictionary', () => {
      const savedDictionary: DictionaryDto = {
        ...newDictionary,
        id: uniqueIdMock,
      };

      const storage = AppDataStorage.getInstance();

      storage.createDictionary(newDictionary);

      expect(storage.getDictionary(uniqueIdMock)).toStrictEqual(savedDictionary);
      expect(getUniqueIdMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Invalid cases', () => {
    it('Does not save a new dictionary, if title is empty', () => {
      const dictionaryForSaving = { ...newDictionary, title: '' };

      const storage = AppDataStorage.getInstance();

      expect(() => {
        storage.createDictionary(dictionaryForSaving);
      }).toThrowError(new Error('Не заполнено название словаря'));

      expect(getUniqueIdMock).not.toHaveBeenCalled();
    });

    it('Does not save a new dictionary with the duplicated title', () => {
      const savedDictionary: DictionaryDto = {
        ...newDictionary,
        id: uniqueIdMock,
      };

      const storage = AppDataStorage.getInstance();

      storage.createDictionary(newDictionary);

      expect(() => {
        storage.createDictionary(newDictionary);
      }).toThrowError(new Error('Такой словарь уже существует'));

      expect(storage.getDictionary(uniqueIdMock)).toStrictEqual(savedDictionary);
      expect(getUniqueIdMock).toHaveBeenCalledTimes(1);
    });
  });
});
