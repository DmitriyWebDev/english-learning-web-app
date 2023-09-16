import { create } from 'zustand';
import { DictionaryPreviewDto, getDictionariesPreviewList } from '../../../shared/api';

type DictionaryStore = DictionaryStoreState & DictionaryStoreActions;

type DictionaryStoreState = {
  previewItems: DictionaryPreviewDto[];
};

type DictionaryStoreActions = {
  getPreviewItems: () => void;
};

export const useDictionaryStore = create<DictionaryStore>()((set) => ({
  previewItems: [],
  getPreviewItems: async () => {
    set({ previewItems: await getDictionariesPreviewList() });
  },
}));
