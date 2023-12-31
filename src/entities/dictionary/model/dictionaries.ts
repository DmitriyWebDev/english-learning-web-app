import { create } from 'zustand';
import {
  DictionaryDto,
  DictionaryDtoForCreation,
  DictionaryPreviewDto,
  getDictionariesPreviewList as getDictionariesPreviewListApi,
  createDictionary as createDictionaryApi,
  updateDictionary as updateDictionaryApi,
  getDictionaryForEdit as getDictionaryForEditApi,
  deleteDictionary as deleteDictionaryApi,
  DictionaryTermDto,
} from '../../../shared/api';
import omit from 'lodash/omit';
import cloneDeep from 'lodash/cloneDeep';
import { routerApi } from '../../../shared/lib';

type DictionaryStore = DictionaryStoreState & DictionaryStoreActions;

type DictionaryStoreState = {
  previewItems: DictionaryPreviewDto[];
  itemForCreating: DictionaryDtoForCreation;
  itemForUpdating: DictionaryDto;
};

type DictionaryStoreActions = {
  getPreviewItems: () => void;
  getItemForEdit: (id: DictionaryDto['id']) => void;
  changeCreatingDictionaryTitle: (title: string) => void;
  changeUpdatingDictionaryTitle: (title: string) => void;
  createDictionary: () => void;
  updateDictionary: () => void;
  deleteDictionaryOnPreviewListPage: (id: DictionaryDto['id']) => void;
  deleteDictionaryOnEditPage: (id: DictionaryDto['id']) => void;
  changeDictionaryTermValue: (
    data: Pick<DictionaryTermDto, 'orderNumber' | 'value'>,
    isForNewDictionary: boolean,
  ) => void;
  changeDictionaryTermValueTranslated: (
    data: Pick<DictionaryTermDto, 'orderNumber' | 'valueTranslated'>,
    isForNewDictionary: boolean,
  ) => void;
  addEmptyTermToDictionary: (isForNewDictionary: boolean) => void;
  deleteTermFromDictionary: (
    data: Pick<DictionaryTermDto, 'orderNumber'> & {
      isForNewDictionary: boolean;
    },
  ) => void;
};

const emptyDictionary: DictionaryDto = {
  id: '',
  title: '',
  terms: [],
};

const emptyDictionaryTerm: DictionaryDto['terms'][number] = {
  orderNumber: 1,
  value: '',
  valueTranslated: '',
};

const initialState: DictionaryStoreState = {
  previewItems: [],
  itemForCreating: {
    ...omit(cloneDeep(emptyDictionary), 'id'),
    terms: [
      {
        ...emptyDictionaryTerm,
        orderNumber: 1,
      },
    ],
  },
  itemForUpdating: {
    ...cloneDeep(emptyDictionary),
  },
};

const getPreviewItemsUtil = async (set: (data: Partial<DictionaryStore>) => void) => {
  set({ previewItems: await getDictionariesPreviewListApi() });
};

export const useDictionaryStore = create<DictionaryStore>()((set, getState) => ({
  ...initialState,

  getPreviewItems: async () => {
    await getPreviewItemsUtil(set);
  },

  getItemForEdit: async (id) => {
    set({ itemForUpdating: await getDictionaryForEditApi(id) });
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

  changeUpdatingDictionaryTitle: (title: string) => {
    set((state) => ({
      ...state,
      itemForUpdating: {
        ...state.itemForUpdating,
        title,
      },
    }));
  },

  createDictionary: async () => {
    await createDictionaryApi(getState().itemForCreating);

    routerApi.goToDictionaryPreviewListPage();

    set(initialState);
  },

  updateDictionary: async () => {
    await updateDictionaryApi(getState().itemForUpdating);

    routerApi.goToDictionaryPreviewListPage();

    set(initialState);
  },

  deleteDictionaryOnPreviewListPage: async (id) => {
    await deleteDictionaryApi(id);

    await getPreviewItemsUtil(set);
  },

  deleteDictionaryOnEditPage: async (id) => {
    await deleteDictionaryApi(id);

    routerApi.goToDictionaryPreviewListPage();

    set(initialState);
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

  addEmptyTermToDictionary: (isForNewDictionary) => {
    set((state) => {
      const targetDictionaryKey = isForNewDictionary ? 'itemForCreating' : 'itemForUpdating';
      const targetDictionary = state[targetDictionaryKey];
      const targetDictionaryTerms = targetDictionary.terms;

      let maxTermOrderNumber = 1;

      for (const { orderNumber } of targetDictionaryTerms) {
        if (orderNumber > maxTermOrderNumber) {
          maxTermOrderNumber = orderNumber;
        }
      }

      return {
        ...state,
        [targetDictionaryKey]: {
          ...targetDictionary,
          terms: [
            ...targetDictionary.terms,
            {
              ...emptyDictionaryTerm,
              orderNumber: maxTermOrderNumber + 1,
            },
          ],
        },
      };
    });
  },

  deleteTermFromDictionary: ({ isForNewDictionary, orderNumber: deletedOrderNumber }) => {
    set((state) => {
      const targetDictionaryKey = isForNewDictionary ? 'itemForCreating' : 'itemForUpdating';
      const targetDictionary = state[targetDictionaryKey];
      const targetDictionaryTerms = targetDictionary.terms;

      if (targetDictionaryTerms.length === 1) {
        throw new Error('Нельзя удалить последний термин словаря');
      }

      const targetIndex = targetDictionaryTerms.findIndex((i) => i.orderNumber === deletedOrderNumber);

      if (targetIndex < 0) {
        throw new Error('Термин для удаления не найден');
      }

      const newTerms = [
        ...[...targetDictionaryTerms.slice(0, targetIndex), ...targetDictionaryTerms.slice(targetIndex + 1)].map(
          (item) => {
            if (item.orderNumber > deletedOrderNumber) {
              return { ...item, orderNumber: item.orderNumber - 1 };
            }

            return item;
          },
        ),
      ];

      return {
        ...state,
        [targetDictionaryKey]: {
          ...targetDictionary,
          terms: [...newTerms],
        },
      };
    });
  },

  reset: () => {
    set(initialState);
  },
}));
