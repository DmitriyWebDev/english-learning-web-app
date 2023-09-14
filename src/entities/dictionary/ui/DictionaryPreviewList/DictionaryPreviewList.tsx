import { FC, useEffect, useRef } from 'react';
import { DictionaryPreviewListItem } from '../DictionaryPreviewListItem/DictionaryPreviewListItem';
import { routerApi } from '../../../../shared/lib';
import Grid from '@mui/material/Unstable_Grid2';
import { useDictionaryStore } from '../../model';

const { goToDictionaryDetailLearnPage } = routerApi;

export const DictionaryPreviewList: FC = () => {
  const dictionaryStore = useDictionaryStore();
  const dictionaryStoreRef = useRef(dictionaryStore);

  useEffect(() => {
    dictionaryStoreRef.current.getPreviewItems();
  }, []);

  return (
    <Grid container spacing={2}>
      {dictionaryStore.previewItems.map(({ id, title }) => (
        <DictionaryPreviewListItem key={id} id={id} title={title} onClick={goToDictionaryDetailLearnPage} />
      ))}
    </Grid>
  );
};
