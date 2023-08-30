import { FC, useEffect } from 'react';
import { DictionaryList } from '../entities/DictionaryList/DictionaryList';
import { appEventEmitter } from '../shared/eventEmitter';

export const AppComponent: FC = () => {
  const handleEventRouterGoToPage = (id: string) => {
    console.log('router:goToPage', id);
  };

  useEffect(() => {
    appEventEmitter.addListener('router:goToPage', handleEventRouterGoToPage);

    return () => {
      appEventEmitter.removeListener('router:goToPage', handleEventRouterGoToPage);
    };
  }, []);

  return <DictionaryList />;
};
