import { FC, ReactNode, useEffect, useRef } from 'react';
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

  let render: ReactNode = <Grid xs={'auto'}>Словарей не найдено. Создайте свой первый словарь.</Grid>;

  if (Array.isArray(dictionaryStore.previewItems) && dictionaryStore.previewItems.length > 0) {
    render = dictionaryStore.previewItems.map(({ id, title }) => (
      <DictionaryPreviewListItem key={id} id={id} title={title} onClick={goToDictionaryDetailLearnPage} />
    ));
  }

  return (
    <Grid container spacing={2}>
      {render}
    </Grid>
  );
};
