import { FC, useCallback, useRef } from 'react';
import { AppGrid as Grid } from '../../../shared/ui';
import { TermForm, TermFormProps } from '../../../entities/term';
import { DictionaryDto } from '../../../shared/api';
import { useDictionaryStore } from '../../../entities/dictionary';

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

  return (
    <Grid container direction={{ xs: 'row' }} rowSpacing={{ xs: 2 }} justifyContent={'space-between'} margin={'15px 0'}>
      {items.map((termData) => (
        <TermForm
          key={termData.orderNumber}
          termData={termData}
          onChangeValue={handleChangeTermValue}
          onChangeValueTranslated={handleChangeTermValueTranslated}
        />
      ))}
    </Grid>
  );
};
