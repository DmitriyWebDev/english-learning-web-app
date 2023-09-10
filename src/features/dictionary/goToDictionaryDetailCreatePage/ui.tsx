import { FC } from 'react';
import { Button } from '@mui/material';
import { routerApi } from '../../../shared/lib';

const { goToDictionaryDetailCreatePage } = routerApi;

export type Props = {
  text: string;
};

export const GoToDictionaryDetailCreatePage: FC<Props> = ({ text }: Props) => {
  return (
    <Button variant="contained" onClick={goToDictionaryDetailCreatePage}>
      {text}
    </Button>
  );
};
