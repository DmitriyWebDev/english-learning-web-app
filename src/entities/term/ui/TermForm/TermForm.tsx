import React, { FC } from 'react';
import { AppGrid as Grid } from '../../../../shared/ui';
import { TextField, Box } from '@mui/material';
import { DictionaryTermDto } from '../../../../shared/api';
import isEqual from 'lodash/isEqual';
import Button from '@mui/material/Button';

export type Props = {
  termData: DictionaryTermDto;
  onChangeValue: (data: Pick<DictionaryTermDto, 'orderNumber' | 'value'>) => void;
  onChangeValueTranslated: (data: Pick<DictionaryTermDto, 'orderNumber' | 'valueTranslated'>) => void;
  onDeleteTerm: (data: Pick<DictionaryTermDto, 'orderNumber'>) => void;
};

const itemWidth = '49.5%';

const TermFormComponent: FC<Props> = ({ termData, onChangeValue, onChangeValueTranslated, onDeleteTerm }: Props) => {
  const { orderNumber, value, valueTranslated } = termData;

  return (
    <Box
      sx={{
        margin: '0 0 10px 0',
        padding: '10px',
        borderRadius: '12px',
        border: '1px solid black',
      }}
    >
      <Grid
        container
        direction={{ xs: 'row' }}
        rowSpacing={{ xs: 2 }}
        justifyContent={'space-between'}
        margin={'0 0 0 0'}
      >
        <Grid id={value} width={itemWidth} container justifyContent={'flex-start'}>
          #{orderNumber}
        </Grid>

        <Grid
          id={value}
          width={itemWidth}
          container
          justifyContent={'flex-end'}
          onClick={() => onDeleteTerm({ orderNumber })}
        >
          <Button variant="contained" color="error">
            Удалить термин
          </Button>
        </Grid>

        <Grid id={value} width={itemWidth}>
          <TextField
            id={value}
            label="Термин"
            variant="outlined"
            value={value}
            onChange={(event) => {
              onChangeValue({
                orderNumber,
                value: event.target.value,
              });
            }}
            fullWidth
            multiline
          />
        </Grid>

        <Grid id={value} width={itemWidth}>
          <TextField
            id={valueTranslated}
            label="Перевод"
            variant="outlined"
            value={valueTranslated}
            onChange={(event) => {
              onChangeValueTranslated({
                orderNumber,
                valueTranslated: event.target.value,
              });
            }}
            fullWidth
            multiline
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export const TermForm = React.memo(TermFormComponent, isEqual);
