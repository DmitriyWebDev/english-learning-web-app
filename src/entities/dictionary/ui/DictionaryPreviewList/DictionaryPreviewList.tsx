import { FC, ReactNode } from 'react';
import { DictionaryPreviewListItem } from '../DictionaryPreviewListItem/DictionaryPreviewListItem';
import { routerApi } from '../../../../shared/lib';
import Grid from '@mui/material/Unstable_Grid2';
import { DictionaryPreviewDto } from '../../../../shared/api';

const { goToDictionaryDetailLearnPage } = routerApi;

type Props = {
  items: DictionaryPreviewDto[];
};

export const DictionaryPreviewList: FC<Props> = ({ items }: Props) => {
  let render: ReactNode = <Grid xs={'auto'}>Словарей не найдено. Создайте свой первый словарь.</Grid>;

  if (Array.isArray(items) && items.length > 0) {
    render = items.map(({ id, title }) => (
      <DictionaryPreviewListItem key={id} id={id} title={title} onClick={goToDictionaryDetailLearnPage} />
    ));
  }

  return (
    <Grid container spacing={2}>
      {render}
    </Grid>
  );
};
