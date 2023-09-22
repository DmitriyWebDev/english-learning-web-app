import { FC, useEffect, useRef } from 'react';
import { AppGrid as Grid, PageContainer } from '../../shared/ui';
import {
  AddTermFormToDictionary,
  ChangeDictionaryTitleOnCreationPage,
  CreateDictionaryOnCreationPage,
  GoToDictionaryPreviewListPage,
} from '../../features/dictionary';
import { ShowEditableDictionaryTerms } from '../../features/dictionary/showDictionaryTerms';
import { useDictionaryStore } from '../../entities/dictionary';

export const DictionaryDetailPageCreate: FC = () => {
  const dictionaryStore = useDictionaryStore();
  const dictionaryStoreRef = useRef(dictionaryStore);
  const terms = useDictionaryStore((state) => state.itemForCreating.terms);

  useEffect(() => {
    dictionaryStoreRef.current.getPreviewItems();
  }, []);

  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid>
          <GoToDictionaryPreviewListPage text={'Назад к списку словарей'} />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
        <Grid xs={10}>Создать новый словарь</Grid>

        <Grid xs={'auto'}>
          <CreateDictionaryOnCreationPage />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid>
          <ChangeDictionaryTitleOnCreationPage />
        </Grid>
      </Grid>

      <ShowEditableDictionaryTerms mode={'dictionaryCreate'} items={terms} />

      <Grid container spacing={2}>
        <Grid>
          <AddTermFormToDictionary />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid>
          <CreateDictionaryOnCreationPage />
        </Grid>
      </Grid>
    </PageContainer>
  );
};
