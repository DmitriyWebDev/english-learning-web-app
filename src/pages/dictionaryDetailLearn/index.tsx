import { FC } from 'react';
import { PageContainer } from '../../shared/ui';
import Grid from '@mui/material/Unstable_Grid2';
import { GoToDictionaryPreviewListPage } from '../../features/dictionary';
import { GoToDictionaryDetailEditPage } from '../../features/dictionary/goToDictionaryDetailEditPage/ui';

export const DictionaryDetailPageLearn: FC = () => {
  return (
    <PageContainer>
      <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
        <Grid xs={'auto'}>
          <GoToDictionaryPreviewListPage text={'Назад к списку словарей'} />
        </Grid>

        <Grid xs={'auto'}>
          <GoToDictionaryDetailEditPage id={'1'} text={'Редактировать'} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};
