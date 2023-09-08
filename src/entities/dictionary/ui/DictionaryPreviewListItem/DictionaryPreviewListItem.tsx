import { FC } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { dictionaryPreviewListStyles as styled } from './styles';

export type Props = {
  id: string;
  title: string;
  onClick: (id: string) => void;
};

export const DictionaryPreviewListItem: FC<Props> = ({ id, title, onClick }: Props) => {
  return (
    <Grid xs={3} id={id} onClick={() => onClick(id)}>
      <styled.Item>{title}</styled.Item>
    </Grid>
  );
};
