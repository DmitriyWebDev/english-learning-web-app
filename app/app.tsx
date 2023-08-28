import { createRoot } from 'react-dom/client';
import { AppComponent } from './app-component';

const container = document.getElementById('appRoot');

if (container) {
  const root = createRoot(container);

  root.render(<AppComponent />);
} else {
  console.error('Web app root dom node not found');
}
