import { FC, useEffect, useRef } from 'react';
import { DictionaryDto } from '../../shared/api';
import { useDictionaryStore } from '../../entities/dictionary';
import { AppGrid as Grid, PageContainer } from '../../shared/ui';
import { AddTermFormToDictionary, GoToDictionaryPreviewListPage } from '../../features/dictionary';
import { ShowEditableDictionaryTerms } from '../../features/dictionary/showDictionaryTerms';
import { SaveDictionaryOnEditingPage } from '../../features/dictionary';
import { ChangeDictionaryTitleOnEditingPage } from '../../features/dictionary/changeDictionaryTitle';

type Props = {
  dictionaryId: DictionaryDto['id'];
};

const pageMode = 'dictionaryUpdate';

export const DictionaryDetailPageEdit: FC<Props> = ({ dictionaryId }: Props) => {
  const dictionaryStore = useDictionaryStore();
  const dictionaryStoreRef = useRef(dictionaryStore);
  const terms = useDictionaryStore((state) => state.itemForUpdating.terms);

  useEffect(() => {
    dictionaryStoreRef.current.getItemForEdit(dictionaryId);
  }, [dictionaryId]);

  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid>
          <GoToDictionaryPreviewListPage text={'Назад к списку словарей'} />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
        <Grid xs={10}>Редактирование словаря</Grid>

        <Grid xs={'auto'}>
          <SaveDictionaryOnEditingPage />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid>
          <ChangeDictionaryTitleOnEditingPage />
        </Grid>
      </Grid>

      <ShowEditableDictionaryTerms mode={pageMode} items={terms} />

      <Grid container spacing={2}>
        <Grid>
          <AddTermFormToDictionary mode={pageMode} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid>
          <SaveDictionaryOnEditingPage />
        </Grid>
      </Grid>
    </PageContainer>
  );
};
