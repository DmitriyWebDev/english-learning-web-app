import { FC, useEffect, useState } from 'react';
import { DictionaryDto } from '../../../shared/api';
import { Box, Button, TextField } from '@mui/material';

type Props = {
  items: DictionaryDto['terms'];
  onLearningCompleted: () => void;
};

type LearningState = {
  completedTerms: Props['items'];
  currentTerms: Props['items'];
  nextTerms: Props['items'];
  currentTermData: {
    index: number;
    valueTranslatedByUser: string;
  };
};

const initialLearningState: LearningState = {
  currentTermData: {
    index: 0,
    valueTranslatedByUser: '',
  },
  completedTerms: [],
  currentTerms: [],
  nextTerms: [],
};

// TODO Refactoring. Move business logic to store.

export const LearnDictionaryTerms: FC<Props> = ({ items: initialTerms, onLearningCompleted }: Props) => {
  const [learningState, setLearningState] = useState(initialLearningState);
  const [shouldShowTermError, setShouldShowTermError] = useState(false);
  const [shouldShowContinueButton, setShouldShowContinueButton] = useState(false);

  const completedTermsCount = learningState.completedTerms.length;
  const allTermsCount = initialTerms.length;

  useEffect(() => {
    setLearningState({ ...initialLearningState, currentTerms: [...initialTerms] });
  }, [initialTerms]);

  useEffect(() => {
    if (completedTermsCount === allTermsCount) onLearningCompleted();
    // eslint-disable-next-line
  }, [completedTermsCount, allTermsCount]);

  const termIndex = learningState.currentTermData.index;
  const term = learningState.currentTerms[termIndex];
  const termValue = learningState.currentTerms[termIndex]?.value ?? '';
  const termValueTranslated = learningState.currentTerms[termIndex]?.valueTranslated ?? '';
  const termValueTranslatedByUser = learningState.currentTermData.valueTranslatedByUser ?? '';

  const goToNextTerm = () => {
    setShouldShowTermError(false);

    const nextItemIndexValue = learningState.currentTermData.index + 1;
    const shouldRestartCurrentItems = nextItemIndexValue + 1 > learningState.currentTerms.length;

    if (shouldRestartCurrentItems) {
      setLearningState({
        ...learningState,
        currentTermData: {
          ...initialLearningState.currentTermData,
        },
        currentTerms: [...learningState.nextTerms],
        nextTerms: [],
        completedTerms: !shouldShowTermError
          ? [...learningState.completedTerms, { ...term }]
          : learningState.completedTerms,
      });

      return;
    }

    setLearningState({
      ...learningState,
      currentTermData: {
        ...learningState.currentTermData,
        index: learningState.currentTermData.index + 1,
        valueTranslatedByUser: '',
      },
      completedTerms: !shouldShowTermError
        ? [...learningState.completedTerms, { ...term }]
        : learningState.completedTerms,
    });
  };

  return (
    <Box
      sx={{
        margin: '15px 0',
      }}
    >
      <div>Термин - {termValue}</div>

      <div>
        Количество изученных терминов {completedTermsCount} из {allTermsCount}
      </div>

      {shouldShowTermError && <div style={{ color: 'red' }}>Ошибка. Правильный ответ - {termValueTranslated}</div>}

      <div>
        <TextField
          id="btn_createDictionary"
          label="Название словаря"
          variant="outlined"
          value={termValueTranslatedByUser}
          onChange={(event) => {
            setLearningState({
              ...learningState,
              currentTermData: {
                ...learningState.currentTermData,
                valueTranslatedByUser: event.target.value,
              },
            });
          }}
        />
      </div>

      <div>
        {!shouldShowTermError && !shouldShowContinueButton ? (
          <Button
            variant="contained"
            onClick={() => {
              const isValid = termValueTranslated.trim() === termValueTranslatedByUser.trim();

              if (!isValid) {
                setLearningState({ ...learningState, nextTerms: [...learningState.nextTerms, { ...term }] });

                setShouldShowTermError(true);
                setShouldShowContinueButton(true);
                return;
              }

              goToNextTerm();
            }}
          >
            Ответить
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              setShouldShowTermError(false);
              setShouldShowContinueButton(false);

              if (completedTermsCount === allTermsCount) return;

              goToNextTerm();
            }}
          >
            Продолжить
          </Button>
        )}
      </div>
    </Box>
  );
};
