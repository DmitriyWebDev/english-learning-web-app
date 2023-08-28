import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppComponent } from './app-component';

const container = document.getElementById('appRoot');

if (container) {
  const root = createRoot(container);

  root.render(
    <>
      <CssBaseline />
      <AppComponent />
    </>,
  );
} else {
  console.error('Web app root dom node not found');
}
