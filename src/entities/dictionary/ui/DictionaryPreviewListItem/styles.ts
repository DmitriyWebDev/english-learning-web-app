import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const Item = styled(Box)`
  border: 1px solid black;
  text-align: center;

  :hover {
    cursor: pointer;
  }
`;

export const dictionaryPreviewListStyles = {
  Item,
} as const;
