import { FC, useCallback, useRef } from 'react';
import { Button } from '@mui/material';
import { useDictionaryStore } from '../../../entities/dictionary';

type Props = {
  mode: 'dictionaryCreate' | 'dictionaryUpdate';
};

export const AddTermFormToDictionary: FC<Props> = ({ mode }: Props) => {
  const dictionaryStore = useDictionaryStore();
  const dictionaryStoreRef = useRef(dictionaryStore);
  const isForNewDictionary = mode === 'dictionaryCreate';

  const handleAddTerm = useCallback(() => {
    dictionaryStoreRef.current.addEmptyTermToDictionary(isForNewDictionary);
  }, [isForNewDictionary]);

  return (
    <Button variant="contained" onClick={handleAddTerm}>
      Добавить термин
    </Button>
  );
};
