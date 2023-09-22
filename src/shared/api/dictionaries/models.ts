export type DictionaryDto = {
  id: string;
  title: string;
  terms: DictionaryTermDto[];
};

export type DictionaryPreviewDto = DictionaryDto;

export type DictionaryDtoForCreation = Omit<DictionaryDto, 'id'>;

export type DictionaryTermDto = {
  orderNumber: number;
  value: string;
  valueTranslated: string;
};
