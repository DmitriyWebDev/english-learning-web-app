import { FC } from 'react';
import { PageContainer, AppGrid as Grid } from '../../shared/ui';
import { GoToDictionaryPreviewListPage } from '../../features/dictionary';
import { GoToDictionaryDetailEditPage } from '../../features/dictionary/goToDictionaryDetailEditPage';
import { DictionaryDto } from '../../shared/api';

type Props = {
  dictionaryId: DictionaryDto['id'];
};

export const DictionaryDetailPageLearn: FC<Props> = ({ dictionaryId }: Props) => {
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
    </PageContainer>
  );
};
