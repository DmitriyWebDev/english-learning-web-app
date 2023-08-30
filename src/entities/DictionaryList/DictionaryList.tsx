import { FC } from 'react';
import { Container, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { DictionaryListItem } from './DictionaryListItem';
import { appEventEmitter } from '../../shared/eventEmitter';

export const DictionaryList: FC = () => {
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
        <DictionaryListItem
          id={'1'}
          title={'Словарь 1'}
          onClick={(id) => {
            appEventEmitter.emit('router:goToPage', id);
          }}
        />
      </Grid>
    </Container>
  );
};
