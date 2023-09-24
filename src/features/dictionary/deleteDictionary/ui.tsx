import { FC } from 'react';
import { Button } from '@mui/material';
import { useDictionaryStore } from '../../../entities/dictionary';
import { DictionaryDto } from '../../../shared/api';

type Props = {
  id: DictionaryDto['id'];
};

export const DeleteDictionaryOnPreviewListPage: FC<Props> = ({ id }: Props) => {
  const dictionaryStore = useDictionaryStore();

  return (
    <Button variant="contained" color={'error'} onClick={() => dictionaryStore.deleteDictionaryOnPreviewListPage(id)}>
      Удалить
    </Button>
  );
};

export const DeleteDictionaryOnEditPage: FC<Props> = ({ id }: Props) => {
  const dictionaryStore = useDictionaryStore();

  return (
    <Button variant="contained" color={'error'} onClick={() => dictionaryStore.deleteDictionaryOnEditPage(id)}>
      Удалить
    </Button>
  );
};
