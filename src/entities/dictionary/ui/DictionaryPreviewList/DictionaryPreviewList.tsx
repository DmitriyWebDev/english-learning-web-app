import { FC, useCallback } from 'react';
import { DictionaryPreviewListItem } from '../DictionaryPreviewListItem/DictionaryPreviewListItem';
import { appEventEmitter } from '../../../../shared/lib';
import Grid from '@mui/material/Unstable_Grid2';

// TODO Refactoring by FSD

export const DictionaryPreviewList: FC = () => {
  const handleClickOnDictionary = useCallback((dictionaryId: string) => {
    appEventEmitter.emit('router:goToPage', {
      pageId: 'dictionaryDetailLearn',
      payload: {
        dictionaryId,
      },
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <DictionaryPreviewListItem id={'1'} title={'Словарь 1'} onClick={handleClickOnDictionary} />
      <DictionaryPreviewListItem id={'2'} title={'Словарь 2'} onClick={handleClickOnDictionary} />
      <DictionaryPreviewListItem id={'3'} title={'Словарь 3'} onClick={handleClickOnDictionary} />
      <DictionaryPreviewListItem id={'4'} title={'Словарь 4'} onClick={handleClickOnDictionary} />
    </Grid>
  );
};
