import { FC } from 'react';
import { AppGrid as Grid, PageContainer } from '../../shared/ui';
import { TermFormList } from '../../entities/term';
import {
  AddTermFormToDictionary,
  ChangeDictionaryTitleOnCreationPage,
  CreateDictionaryOnCreationPage,
  GoToDictionaryPreviewListPage,
} from '../../features/dictionary';

export const DictionaryDetailPageCreate: FC = () => {
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

      <TermFormList />

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
