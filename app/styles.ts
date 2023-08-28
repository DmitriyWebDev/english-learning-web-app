import { styled } from '@mui/material/styles';

const AppRoot = styled('div')`
  color: #20b2aa;
  margin-bottom: 3px;

  :hover {
    color: #2e8b57;
  }
`;

export const appStyles = {
  AppRoot,
} as const;
