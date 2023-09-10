import { FC } from 'react';
import { DictionaryPreviewListItem } from '../DictionaryPreviewListItem/DictionaryPreviewListItem';
import { routerApi } from '../../../../shared/lib';
import Grid from '@mui/material/Unstable_Grid2';

const { goToDictionaryDetailLearnPage } = routerApi;

// TODO Refactoring by FSD for routerApi encapsulated usage

export const DictionaryPreviewList: FC = () => {
  return (
    <Grid container spacing={2}>
      <DictionaryPreviewListItem id={'1'} title={'Словарь 1'} onClick={goToDictionaryDetailLearnPage} />
      <DictionaryPreviewListItem id={'2'} title={'Словарь 2'} onClick={goToDictionaryDetailLearnPage} />
      <DictionaryPreviewListItem id={'3'} title={'Словарь 3'} onClick={goToDictionaryDetailLearnPage} />
      <DictionaryPreviewListItem id={'4'} title={'Словарь 4'} onClick={goToDictionaryDetailLearnPage} />
    </Grid>
  );
};
