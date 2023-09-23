import { FC } from 'react';
import { TextField } from '@mui/material';
import { useDictionaryStore } from '../../../entities/dictionary';

export const ChangeDictionaryTitleOnCreationPage: FC = () => {
  const dictionaryStore = useDictionaryStore();

  return (
    <TextField
      id="btn_createDictionary"
      label="Название словаря"
      variant="outlined"
      value={dictionaryStore.itemForCreating.title}
      onChange={(event) => {
        dictionaryStore.changeCreatingDictionaryTitle(event.target.value);
      }}
    />
  );
};
