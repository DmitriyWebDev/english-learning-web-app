import { FC } from 'react';
import { Button } from '@mui/material';

export type Props = {
  text: string;
};

export const GoToDictionaryPreviewList: FC<Props> = ({ text }: Props) => {
  return <Button variant="contained">{text}</Button>;
};
