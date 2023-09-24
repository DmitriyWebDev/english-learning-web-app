import { FC, useCallback, useRef } from 'react';
import { TermForm, TermFormProps, TermReadOnlyCard } from '../../../entities/term';
import { DictionaryDto } from '../../../shared/api';
import { useDictionaryStore } from '../../../entities/dictionary';
import { Box } from '@mui/material';

type Props = {
  mode: 'dictionaryCreate' | 'dictionaryUpdate';
  items: DictionaryDto['terms'];
};

export const ShowEditableDictionaryTerms: FC<Props> = ({ items, mode }: Props) => {
  const dictionaryStore = useDictionaryStore();
  const dictionaryStoreRef = useRef(dictionaryStore);
  const isForNewDictionary = mode === 'dictionaryCreate';

  const handleChangeTermValue = useCallback(
    (data: Parameters<TermFormProps['onChangeValue']>[0]) => {
      dictionaryStoreRef.current.changeDictionaryTermValue(data, isForNewDictionary);
    },
    [isForNewDictionary],
  );

  const handleChangeTermValueTranslated = useCallback(
    (data: Parameters<TermFormProps['onChangeValueTranslated']>[0]) => {
      dictionaryStoreRef.current.changeDictionaryTermValueTranslated(data, isForNewDictionary);
    },
    [isForNewDictionary],
  );

  const handleDeleteTerm = useCallback(
    ({ orderNumber }: Parameters<TermFormProps['onDeleteTerm']>[0]) => {
      dictionaryStoreRef.current.deleteTermFromDictionary({ orderNumber, isForNewDictionary });
    },
    [isForNewDictionary],
  );

  return (
    <Box
      sx={{
        margin: '15px 0',
      }}
    >
      {items.map((termData) => (
        <TermForm
          key={termData.orderNumber}
          termData={termData}
          onChangeValue={handleChangeTermValue}
          onChangeValueTranslated={handleChangeTermValueTranslated}
          onDeleteTerm={handleDeleteTerm}
        />
      ))}
    </Box>
  );
};

export const ShowReadOnlyDictionaryTerms: FC<Pick<Props, 'items'>> = ({ items }) => {
  return (
    <>
      <Box
        sx={{
          margin: '15px 0',
        }}
      >
        Список терминов
      </Box>

      <Box
        sx={{
          margin: '15px 0',
        }}
      >
        {items.map((termData) => (
          <TermReadOnlyCard key={termData.orderNumber} termData={termData} />
        ))}
      </Box>
    </>
  );
};
