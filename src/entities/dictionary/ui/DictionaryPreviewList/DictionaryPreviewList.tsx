import { FC } from 'react';
import { DictionaryPreviewListItem } from '../DictionaryPreviewListItem/DictionaryPreviewListItem';
import { appEventEmitter } from '../../../../shared/eventEmitter';
import Grid from '@mui/material/Unstable_Grid2';

export const DictionaryPreviewList: FC = () => {
  return (
    <Grid container spacing={2}>
      <DictionaryPreviewListItem
        id={'1'}
        title={'Словарь 1'}
        onClick={(id) => {
          appEventEmitter.emit('router:goToPage', id);
        }}
      />
      <DictionaryPreviewListItem
        id={'2'}
        title={'Словарь 2'}
        onClick={(id) => {
          appEventEmitter.emit('router:goToPage', id);
        }}
      />
      <DictionaryPreviewListItem
        id={'3'}
        title={'Словарь 3'}
        onClick={(id) => {
          appEventEmitter.emit('router:goToPage', id);
        }}
      />
      <DictionaryPreviewListItem
        id={'4'}
        title={'Словарь 4'}
        onClick={(id) => {
          appEventEmitter.emit('router:goToPage', id);
        }}
      />
    </Grid>
  );
};
