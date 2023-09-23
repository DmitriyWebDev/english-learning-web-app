import { FC } from 'react';
import { Button } from '@mui/material';
import { DictionaryDto } from '../../../shared/api';
import { routerApi } from '../../../shared/lib';

type Props = {
  id: DictionaryDto['id'];
  text: string;
};

export const OpenDictionary: FC<Props> = ({ id, text }: Props) => {
  return (
    <Button variant="contained" onClick={() => routerApi.goToDictionaryDetailLearnPage(id)}>
      {text}
    </Button>
  );
};
