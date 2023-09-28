import { FC, ReactNode, useEffect, useRef } from 'react';
import { DictionaryPreviewListItem, useDictionaryStore } from '../../entities/dictionary';
import { PageContainer, AppGrid as Grid } from '../../shared/ui';
import { GoToDictionaryDetailCreatePage } from '../../features/dictionary';
import { routerApi } from '../../shared/lib';
import { DictionaryPreviewDto } from '../../shared/api';
import { GoToDictionaryDetailEditPage } from '../../features/dictionary/goToDictionaryDetailEditPage';
import { OpenDictionary } from '../../features/dictionary/openDictionary';
import { DeleteDictionaryOnPreviewListPage } from '../../features/dictionary/deleteDictionary';

const { goToDictionaryDetailLearnPage } = routerApi;

export const DictionaryPreviewListPage: FC = () => {
  const dictionaryStore = useDictionaryStore();
  const dictionaryStoreRef = useRef(dictionaryStore);

  useEffect(() => {
    dictionaryStoreRef.current.getPreviewItems();
  }, []);

  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid xs={'auto'}>
          <div>
            <GoToDictionaryDetailCreatePage text={'Создать словарь'} />
          </div>
        </Grid>
      </Grid>

      <DictionaryPreviewList items={dictionaryStore.previewItems} />
    </PageContainer>
  );
};

type DictionaryPreviewListProps = {
  items: DictionaryPreviewDto[];
};

export function DictionaryPreviewList({ items }: DictionaryPreviewListProps) {
  let render: ReactNode = <Grid xs={'auto'}>Словарей не найдено. Создайте свой первый словарь.</Grid>;

  if (Array.isArray(items) && items.length > 0) {
    render = items.map(({ id, title }) => (
      <DictionaryPreviewListItem
        key={id}
        id={id}
        title={title}
        onClick={goToDictionaryDetailLearnPage}
        editButton={<GoToDictionaryDetailEditPage id={id} text={'Редактировать'} />}
        openButton={<OpenDictionary id={id} text={'Открыть'} />}
        deleteButton={<DeleteDictionaryOnPreviewListPage id={id} />}
      />
    ));
  }

  return (
    <Grid container spacing={2}>
      {render}
    </Grid>
  );
}
