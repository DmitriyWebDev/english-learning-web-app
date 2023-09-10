import { FC } from 'react';
import { Button } from '@mui/material';
import { routerApi } from '../../../shared/lib';

const { goToDictionaryPreviewListPage } = routerApi;

export type Props = {
  text: string;
};

export const GoToDictionaryPreviewListPage: FC<Props> = ({ text }: Props) => {
  return (
    <Button variant="contained" onClick={goToDictionaryPreviewListPage}>
      {text}
    </Button>
  );
};
