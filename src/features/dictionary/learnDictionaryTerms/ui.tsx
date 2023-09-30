import { FC, useEffect, useRef } from 'react';
import { DictionaryDto } from '../../../shared/api';
import { Box, Button, TextField } from '@mui/material';
import {
  useLearningExerciseTermsMemorizationStore as useStore,
  learningExerciseTermsMemorizationStoreSelectors as selectors,
} from '../../../entities/learning';

type Props = {
  items: DictionaryDto['terms'];
  onLearningCompleted: () => void;
};

export const LearnDictionaryTerms: FC<Props> = ({ items: initialTerms, onLearningCompleted }: Props) => {
  const store = useStore();
  const storeRef = useRef(store);

  const visibleButtonKey = useStore(selectors.visibleButtonKey);
  const shouldShowTermError = useStore((state) => state.shouldShowTermError);

  const completedTermsCount = useStore((state) => state.completedTerms.length);
  const allTermsCount = useStore((state) => state.initialTerms.length);
  const term = useStore(selectors.currentTermOriginalData);
  const termValueTranslatedByUser = useStore(selectors.currentTermValueTranslatedByUser);

  useEffect(() => {
    const resetStore = storeRef.current.reset;

    storeRef.current.init(initialTerms);

    return () => {
      resetStore();
    };
  }, [initialTerms]);

  useEffect(() => {
    if (allTermsCount !== 0 && completedTermsCount === allTermsCount) {
      onLearningCompleted();
    }
    // eslint-disable-next-line
  }, [completedTermsCount, allTermsCount]);

  return (
    <Box
      sx={{
        margin: '15px 0',
      }}
    >
      <div>Перевод термина - {term?.value}</div>

      <div>
        Количество изученных терминов {completedTermsCount} из {allTermsCount}
      </div>

      {shouldShowTermError && <div style={{ color: 'red' }}>Ошибка. Правильный ответ - {term?.valueTranslated}</div>}

      <div>
        <TextField
          id="btn_createDictionary"
          label="Введите термин"
          variant="outlined"
          value={termValueTranslatedByUser}
          onChange={(event) => storeRef.current.handleChangeTermTranslationByUser(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();

              const { handleClickOnAnswerButton, handleClickOnContinueButton } = storeRef.current;
              const handler = shouldShowTermError ? handleClickOnContinueButton : handleClickOnAnswerButton;

              handler();
            }
          }}
        />
      </div>

      <div>
        {visibleButtonKey === 'answer' && (
          <Button variant="contained" onClick={storeRef.current.handleClickOnAnswerButton}>
            Ответить
          </Button>
        )}

        {visibleButtonKey === 'continue' && (
          <Button variant="contained" onClick={storeRef.current.handleClickOnContinueButton}>
            Продолжить
          </Button>
        )}
      </div>
    </Box>
  );
};
