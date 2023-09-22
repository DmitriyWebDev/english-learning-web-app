import React, { FC } from 'react';
import { AppGrid as Grid } from '../../../../shared/ui';
import { TextField } from '@mui/material';
import { DictionaryTermDto } from '../../../../shared/api';
import isEqual from 'lodash/isEqual';

export type Props = {
  termData: DictionaryTermDto;
  onChangeValue: (data: Pick<DictionaryTermDto, 'orderNumber' | 'value'>) => void;
  onChangeValueTranslated: (data: Pick<DictionaryTermDto, 'orderNumber' | 'valueTranslated'>) => void;
};

const itemWidth = '49.5%';

const TermFormComponent: FC<Props> = ({ termData, onChangeValue, onChangeValueTranslated }: Props) => {
  const { orderNumber, value, valueTranslated } = termData;

  return (
    <>
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
    </>
  );
};

export const TermForm = React.memo(TermFormComponent, isEqual);
