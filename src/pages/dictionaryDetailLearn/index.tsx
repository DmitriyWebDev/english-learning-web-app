import { FC, useEffect, useRef, useState } from 'react';
import { PageContainer, AppGrid as Grid } from '../../shared/ui';
import { GoToDictionaryPreviewListPage } from '../../features/dictionary';
import { GoToDictionaryDetailEditPage } from '../../features/dictionary/goToDictionaryDetailEditPage';
import { DictionaryDto } from '../../shared/api';
import { ShowReadOnlyDictionaryTerms } from '../../features/dictionary/showDictionaryTerms/ui';
import { useDictionaryStore } from '../../entities/dictionary';
import { Button } from '@mui/material';
import { LearnDictionaryTerms } from '../../features/dictionary/learnDictionaryTerms';

type Props = {
  dictionaryId: DictionaryDto['id'];
};

export const DictionaryDetailPageLearn: FC<Props> = ({ dictionaryId }: Props) => {
  const dictionaryStore = useDictionaryStore();
  const dictionaryStoreRef = useRef(dictionaryStore);
  const dictionaryTitle = useDictionaryStore((state) => state.itemForUpdating.title);
  const terms = useDictionaryStore((state) => state.itemForUpdating.terms);

  useEffect(() => {
    dictionaryStoreRef.current.getItemForEdit(dictionaryId);
  }, [dictionaryId]);

  const [isLearningInProgress, setIsLearningInProgress] = useState(false);

  return (
    <PageContainer>
      <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
        <Grid xs={'auto'}>
          <GoToDictionaryPreviewListPage text={'Назад к списку словарей'} />
        </Grid>

        <Grid xs={'auto'}>
          <GoToDictionaryDetailEditPage id={dictionaryId} text={'Редактировать'} />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
        <Grid xs={10}>{dictionaryTitle}</Grid>

        <Grid xs={'auto'}>
          <Button variant="contained" onClick={() => setIsLearningInProgress(!isLearningInProgress)}>
            {isLearningInProgress ? 'Завершить изучение' : 'Начать изучение'}
          </Button>
        </Grid>
      </Grid>

      {isLearningInProgress ? (
        <LearnDictionaryTerms items={terms} onLearningCompleted={() => setIsLearningInProgress(false)} />
      ) : (
        <ShowReadOnlyDictionaryTerms items={terms} />
      )}
    </PageContainer>
  );
};
