import { create } from 'zustand';
import {
  DictionaryDto,
  DictionaryDtoForCreation,
  DictionaryPreviewDto,
  getDictionariesPreviewList,
  createDictionary as createDictionaryApi,
} from '../../../shared/api';
import omit from 'lodash/omit';

type DictionaryStore = DictionaryStoreState & DictionaryStoreActions;

type DictionaryStoreState = {
  previewItems: DictionaryPreviewDto[];
  itemForCreating: DictionaryDtoForCreation;
};

type DictionaryStoreActions = {
  getPreviewItems: () => void;
  changeCreatingDictionaryTitle: (title: string) => void;
  createDictionary: () => void;
};

const emptyDictionary: DictionaryDto = {
  id: '',
  title: '',
};

const initialState: DictionaryStoreState = {
  previewItems: [],
  itemForCreating: {
    ...omit(emptyDictionary, 'id'),
  },
};

export const useDictionaryStore = create<DictionaryStore>()((set, getState) => ({
  ...initialState,

  getPreviewItems: async () => {
    set({ previewItems: await getDictionariesPreviewList() });
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

  reset: () => {
    set(initialState);
  },
}));
