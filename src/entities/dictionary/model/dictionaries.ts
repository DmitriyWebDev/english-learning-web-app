import { create } from 'zustand';
import {
  DictionaryDto,
  DictionaryDtoForCreation,
  DictionaryPreviewDto,
  getDictionariesPreviewList as getDictionariesPreviewListApi,
  createDictionary as createDictionaryApi,
  DictionaryTermDto,
} from '../../../shared/api';
import omit from 'lodash/omit';
import cloneDeep from 'lodash/cloneDeep';

type DictionaryStore = DictionaryStoreState & DictionaryStoreActions;

type DictionaryStoreState = {
  previewItems: DictionaryPreviewDto[];
  itemForCreating: DictionaryDtoForCreation;
  itemForUpdating: DictionaryDto;
};

type DictionaryStoreActions = {
  getPreviewItems: () => void;
  changeCreatingDictionaryTitle: (title: string) => void;
  createDictionary: () => void;
  changeDictionaryTermValue: (
    data: Pick<DictionaryTermDto, 'orderNumber' | 'value'>,
    isForNewDictionary: boolean,
  ) => void;
  changeDictionaryTermValueTranslated: (
    data: Pick<DictionaryTermDto, 'orderNumber' | 'valueTranslated'>,
    isForNewDictionary: boolean,
  ) => void;
};

const emptyDictionary: DictionaryDto = {
  id: '',
  title: '',
  terms: [],
};

const initialState: DictionaryStoreState = {
  previewItems: [],
  itemForCreating: {
    ...omit(cloneDeep(emptyDictionary), 'id'),
    terms: [
      {
        orderNumber: 1,
        value: '',
        valueTranslated: '',
      },
    ],
  },
  itemForUpdating: {
    ...cloneDeep(emptyDictionary),
  },
};

export const useDictionaryStore = create<DictionaryStore>()((set, getState) => ({
  ...initialState,

  getPreviewItems: async () => {
    set({ previewItems: await getDictionariesPreviewListApi() });
  },

  changeCreatingDictionaryTitle: (title: string) => {
    set((state) => ({
      ...state,
      itemForCreating: {
        ...state.itemForCreating,
        title,
      },
    }));
  },

  createDictionary: async () => {
    await createDictionaryApi(getState().itemForCreating);
  },

  changeDictionaryTermValue: (data, isForNewDictionary) => {
    set((state) => {
      const targetDictionaryKey = isForNewDictionary ? 'itemForCreating' : 'itemForUpdating';
      const targetTermIndex = state[targetDictionaryKey].terms.findIndex((i) => i.orderNumber === data.orderNumber);

      if (targetTermIndex < 0) {
        console.error('Невозможно изменить значение термина, так как термин не найден');
        return state;
      }

      return {
        ...state,
        [targetDictionaryKey]: {
          ...state[targetDictionaryKey],
          terms: [
            ...state[targetDictionaryKey].terms.map((item, index) => {
              if (index !== targetTermIndex) {
                return item;
              }

              return {
                ...item,
                ...data,
              };
            }),
          ],
        },
      };
    });
  },

  changeDictionaryTermValueTranslated: (data, isForNewDictionary) => {
    set((state) => {
      const targetDictionaryKey = isForNewDictionary ? 'itemForCreating' : 'itemForUpdating';
      const targetTermIndex = state[targetDictionaryKey].terms.findIndex((i) => i.orderNumber === data.orderNumber);

      if (targetTermIndex < 0) {
        console.error('Невозможно изменить значение перевода термина, так как термин не найден');
        return state;
      }

      return {
        ...state,
        [targetDictionaryKey]: {
          ...state[targetDictionaryKey],
          terms: [
            ...state[targetDictionaryKey].terms.map((item, index) => {
              if (index !== targetTermIndex) {
                return item;
              }

              return {
                ...item,
                ...data,
              };
            }),
          ],
        },
      };
    });
  },

  reset: () => {
    set(initialState);
  },
}));
