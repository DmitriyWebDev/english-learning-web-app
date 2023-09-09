type RouteDictionaryPreviewList = {
  pageId: 'dictionaryPreviewList';
};

type RouteDictionaryDetailCreate = {
  pageId: 'dictionaryDetailCreate';
};

type RouteDictionaryDetailEdit = {
  pageId: 'dictionaryDetailEdit';
  payload: {
    dictionaryId: string;
  };
};

type RouteDictionaryDetailLearn = {
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
