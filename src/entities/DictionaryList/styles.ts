import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const Item = styled(Box)`
  border: 1px solid black;

  :hover {
    cursor: pointer;
  }
`;

export const dictionaryListStyles = {
  Item,
} as const;
