import { FC } from 'react';
import { AppGrid as Grid } from '../../../../shared/ui';
// import { termFormListItemStyles as styled } from './styles';
import { TextField } from '@mui/material';

export type Props = {
  value: string;
  valueTranslated: string;
};

const itemWidth = '49.5%';

export const TermFormListItem: FC<Props> = ({ value, valueTranslated }: Props) => {
  return (
    <>
      <Grid id={value} width={itemWidth}>
        <TextField id={value} label="Термин" variant="outlined" value={value} fullWidth multiline />
      </Grid>

      <Grid id={value} width={itemWidth}>
        <TextField
          id={valueTranslated}
          label="Перевод"
          variant="outlined"
          value={valueTranslated}
          fullWidth
          multiline
        />
      </Grid>
    </>
  );
};
