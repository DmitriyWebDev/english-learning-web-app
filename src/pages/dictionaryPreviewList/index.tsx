import { FC } from 'react';
import { DictionaryPreviewList } from '../../entities/dictionary';
import Grid from '@mui/material/Unstable_Grid2';
import { PageContainer } from '../../shared/ui';
import { GoToDictionaryDetailCreatePage } from '../../features/dictionary';

export const DictionaryPreviewListPage: FC = () => {
  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid xs={'auto'}>
          <div>
            <GoToDictionaryDetailCreatePage text={'Создать словарь'} />
          </div>
        </Grid>
      </Grid>

      <DictionaryPreviewList />
    </PageContainer>
  );
};
