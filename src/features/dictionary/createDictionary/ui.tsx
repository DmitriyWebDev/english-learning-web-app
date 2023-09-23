import { FC } from 'react';
import { Button } from '@mui/material';
import { useDictionaryStore } from '../../../entities/dictionary';

export const CreateDictionaryOnCreationPage: FC = () => {
  const dictionaryStore = useDictionaryStore();

  return (
    <Button variant="contained" onClick={dictionaryStore.createDictionary}>
      Создать
    </Button>
  );
};

export const SaveDictionaryOnEditingPage: FC = () => {
  const dictionaryStore = useDictionaryStore();

  return (
    <Button variant="contained" onClick={dictionaryStore.updateDictionary}>
      Сохранить
    </Button>
  );
};
