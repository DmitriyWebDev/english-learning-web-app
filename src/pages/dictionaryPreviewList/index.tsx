import { FC, useEffect, useRef } from 'react';
import { DictionaryPreviewList, useDictionaryStore } from '../../entities/dictionary';
import Grid from '@mui/material/Unstable_Grid2';
import { PageContainer } from '../../shared/ui';
import { GoToDictionaryDetailCreatePage } from '../../features/dictionary';

export const DictionaryPreviewListPage: FC = () => {
  const dictionaryStore = useDictionaryStore();
  const dictionaryStoreRef = useRef(dictionaryStore);

  useEffect(() => {
    dictionaryStoreRef.current.getPreviewItems();
  }, []);

  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid xs={'auto'}>
          <div>
            <GoToDictionaryDetailCreatePage text={'Создать словарь'} />
          </div>
        </Grid>
      </Grid>

      <DictionaryPreviewList items={dictionaryStore.previewItems} />
    </PageContainer>
  );
};
