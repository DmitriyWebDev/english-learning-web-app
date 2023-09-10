import { appEventEmitter } from '../eventEmitter';

export type RouteDictionaryPreviewList = {
  pageId: 'dictionaryPreviewList';
};

export type RouteDictionaryDetailCreate = {
  pageId: 'dictionaryDetailCreate';
};

export type RouteDictionaryDetailEdit = {
  pageId: 'dictionaryDetailEdit';
  payload: {
    dictionaryId: string;
  };
};

export type RouteDictionaryDetailLearn = {
  pageId: 'dictionaryDetailLearn';
  payload: {
    dictionaryId: string;
  };
};

export type AppRoute =
  | RouteDictionaryPreviewList
  | RouteDictionaryDetailCreate
  | RouteDictionaryDetailEdit
  | RouteDictionaryDetailLearn;

export const routerApi = {
  goToDictionaryPreviewListPage: () => appEventEmitter.emit('router:goToPage', { pageId: 'dictionaryPreviewList' }),
  goToDictionaryDetailCreatePage: () => appEventEmitter.emit('router:goToPage', { pageId: 'dictionaryDetailCreate' }),
  goToDictionaryDetailEditPage: (dictionaryId: string) =>
    appEventEmitter.emit('router:goToPage', { pageId: 'dictionaryDetailEdit', payload: { dictionaryId } }),
  goToDictionaryDetailLearnPage: (dictionaryId: string) =>
    appEventEmitter.emit('router:goToPage', { pageId: 'dictionaryDetailLearn', payload: { dictionaryId } }),
} as const;
