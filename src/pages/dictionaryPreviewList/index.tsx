import { FC } from 'react';
import { DictionaryPreviewList } from '../../entities/dictionary';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { PageContainer } from '../../shared/ui';

export const DictionaryPreviewListPage: FC = () => {
  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid xs={'auto'}>
          <div>
            <Button variant="contained">Создать словарь</Button>
          </div>
        </Grid>
      </Grid>

      <DictionaryPreviewList />
    </PageContainer>
  );
};
