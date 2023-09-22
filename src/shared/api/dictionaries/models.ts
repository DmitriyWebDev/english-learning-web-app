export type DictionaryDto = {
  id: string;
  title: string;
};

export type DictionaryPreviewDto = DictionaryDto;

export type DictionaryDtoForCreation = Omit<DictionaryDto, 'id'>;
