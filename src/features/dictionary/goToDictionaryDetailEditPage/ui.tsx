import { FC } from 'react';
import { Button } from '@mui/material';
import { routerApi } from '../../../shared/lib';

const { goToDictionaryDetailEditPage } = routerApi;

export type Props = {
  id: string;
  text: string;
};

export const GoToDictionaryDetailEditPage: FC<Props> = ({ id, text }: Props) => {
  return (
    <Button variant="contained" onClick={() => goToDictionaryDetailEditPage(id)}>
      {text}
    </Button>
  );
};
