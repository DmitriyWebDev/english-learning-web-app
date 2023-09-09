import { FC } from 'react';
import { TermFormListItem } from '../TermFormListItem/TermFormListItem';
import Grid from '@mui/material/Unstable_Grid2';

export type Props = {
  //
};

export const TermFormList: FC<Props> = ({}: Props) => {
  return (
    <Grid container direction={{ xs: 'row' }} rowSpacing={{ xs: 2 }} justifyContent={'space-between'} margin={'15px 0'}>
      <TermFormListItem value={'cat'} valueTranslated={'кошка'} />
      <TermFormListItem value={'dog'} valueTranslated={'собака'} />
      <TermFormListItem value={'bird'} valueTranslated={'птица'} />
    </Grid>
  );
};