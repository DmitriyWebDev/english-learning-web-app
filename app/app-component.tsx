import { FC } from 'react';
import { Container, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export const AppComponent: FC = () => {
  return (
    <Container
      maxWidth={'xl'}
      sx={{
        paddingTop: '20px',
        paddingBottom: '20px',
        marginTop: '20px',
        marginBottom: '20px',
        background: 'gray',
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={'auto'}>
          <div>
            <Button variant="contained">Создать словарь</Button>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid xs={3}>
          <div>Словарь 1</div>
        </Grid>

        <Grid xs={3}>
          <div>Словарь 2</div>
        </Grid>

        <Grid xs={3}>
          <div>Словарь 3</div>
        </Grid>

        <Grid xs={3}>
          <div>Словарь 4</div>
        </Grid>

        <Grid xs={3}>
          <div>Словарь 5</div>
        </Grid>
      </Grid>
    </Container>
  );
};
