import { FC, PropsWithChildren } from 'react';
import { Container } from '@mui/material';

export const PageContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container
      maxWidth={'xl'}
      sx={{
        paddingTop: '20px',
        paddingBottom: '20px',
        marginTop: '20px',
        marginBottom: '20px',
        border: '1px solid black',
      }}
    >
      {children}
    </Container>
  );
};
