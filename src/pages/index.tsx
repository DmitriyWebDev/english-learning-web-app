import { FC, useEffect, useState } from 'react';
import { appEventEmitter, AppRoute } from '../shared/lib';
import { DictionaryPreviewListPage } from './dictionaryPreviewList';
import { DictionaryDetailPageCreate } from './dictionaryDetailCreate';
import { DictionaryDetailPageEdit } from './dictionaryDetailEdit';
import { DictionaryDetailPageLearn } from './dictionaryDetailLearn';

export const RootPage: FC = () => {
  const [routerState, setRouterState] = useState<AppRoute>({ pageId: 'dictionaryDetailCreate' });

  useEffect(() => {
    appEventEmitter.addListener('router:goToPage', setRouterState);

    return () => {
      appEventEmitter.removeListener('router:goToPage', setRouterState);
    };
  }, []);

  function renderSwitch() {
    switch (routerState.pageId) {
      case 'dictionaryPreviewList':
        return <DictionaryPreviewListPage />;
      case 'dictionaryDetailCreate':
        return <DictionaryDetailPageCreate />;
      case 'dictionaryDetailEdit':
        return <DictionaryDetailPageEdit />;
      case 'dictionaryDetailLearn':
        return <DictionaryDetailPageLearn />;
      default:
        return <DictionaryPreviewListPage />;
    }
  }

  return renderSwitch();
};
