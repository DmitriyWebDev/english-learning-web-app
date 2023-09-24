import React, { FC } from 'react';
import { AppGrid as Grid } from '../../../../shared/ui';
import { TextField, Box } from '@mui/material';
import { DictionaryTermDto } from '../../../../shared/api';
import isEqual from 'lodash/isEqual';

export type Props = {
  termData: DictionaryTermDto;
};

const itemWidth = '49.5%';

const TermReadOnlyCardComponent: FC<Props> = ({ termData }: Props) => {
  const { value, valueTranslated } = termData;

  return (
    <Box
      sx={{
        margin: '0 0 10px 0',
      }}
    >
      <Grid
        container
        direction={{ xs: 'row' }}
        rowSpacing={{ xs: 2 }}
        justifyContent={'space-between'}
        margin={'0 0 0 0'}
      >
        <Grid id={value} width={itemWidth}>
          <TextField id={value} label="Термин" variant="outlined" value={value} fullWidth multiline disabled />
        </Grid>

        <Grid id={value} width={itemWidth}>
          <TextField
            id={valueTranslated}
            label="Перевод"
            variant="outlined"
            value={valueTranslated}
            fullWidth
            multiline
            disabled
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export const TermReadOnlyCard = React.memo(TermReadOnlyCardComponent, isEqual);
