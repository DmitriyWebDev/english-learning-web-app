import { FC } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { PageContainer } from '../../shared/ui';
import { TermFormList } from '../../entities/term';
import {
  AddTermFormToDictionary,
  ChangeDictionaryTitle,
  CreateDictionary,
  GoToDictionaryPreviewList,
} from '../../features/dictionary';

export const DictionaryDetailPageCreate: FC = () => {
  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid>
          <GoToDictionaryPreviewList text={'Назад к списку словарей'} />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
        <Grid xs={10}>Создать новый словарь</Grid>

        <Grid xs={'auto'}>
          <CreateDictionary />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid>
          <ChangeDictionaryTitle />
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
          <CreateDictionary />
        </Grid>
      </Grid>
    </PageContainer>
  );
};
