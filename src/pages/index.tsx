import { FC, useEffect } from 'react';
import { appEventEmitter } from '../shared/eventEmitter';
import { DictionaryPreviewListPage } from './dictionaryPreviewList';
import { DictionaryDetailPageCreate } from './dictionaryDetailCreate';
import { DictionaryDetailPageEdit } from './dictionaryDetailEdit';
import { DictionaryDetailPageLearn } from './dictionaryDetailLearn';

export const RootPage: FC = () => {
  const handleRouterEventGoToPage = (id: string) => {
    console.log('router:goToPage', id);
  };

  useEffect(() => {
    appEventEmitter.addListener('router:goToPage', handleRouterEventGoToPage);

    return () => {
      appEventEmitter.removeListener('router:goToPage', handleRouterEventGoToPage);
    };
  }, []);

  return <DictionaryPreviewListPage />;
};
