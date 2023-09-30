import { create } from 'zustand';
import { DictionaryTermDto } from '../../../../shared/api';
import { learningExerciseTermsMemorizationStoreSelectors as selectors } from './selectors';

type LearningExerciseTermsMemorizationStore = LearningExerciseTermsMemorizationStoreState &
  LearningExerciseTermsMemorizationStoreActions;

type TermsList = DictionaryTermDto[];

export type LearningExerciseTermsMemorizationStoreState = {
  initialTerms: TermsList;
  completedTerms: TermsList;
  currentTerms: TermsList;
  nextTerms: TermsList;
  currentTermData: {
    index: number;
    valueTranslatedByUser: string;
  };
  shouldShowTermError: boolean;
  shouldShowContinueButton: boolean;
};

type LearningExerciseTermsMemorizationStoreActions = {
  init: (initialTerms: TermsList) => void;
  reset: () => void;
  handleChangeTermTranslationByUser: (val: string) => void;
  handleClickOnAnswerButton: () => void;
  handleClickOnContinueButton: () => void;
};

const initialState: LearningExerciseTermsMemorizationStoreState = {
  initialTerms: [],
  completedTerms: [],
  nextTerms: [],
  currentTerms: [],
  currentTermData: {
    index: 0,
    valueTranslatedByUser: '',
  },
  shouldShowContinueButton: false,
  shouldShowTermError: false,
};

export const useLearningExerciseTermsMemorizationStore = create<LearningExerciseTermsMemorizationStore>()(
  (set, getState) => ({
    ...initialState,

    init: (initialTerms) => {
      set({ ...initialState, initialTerms, currentTerms: [...initialTerms] });
    },

    reset: () => {
      set(initialState);
    },

    handleChangeTermTranslationByUser: (valueTranslatedByUser) => {
      const state = getState();

      set({
        ...state,
        currentTermData: {
          ...state.currentTermData,
          valueTranslatedByUser,
        },
      });
    },

    handleClickOnAnswerButton: () => {
      const newState = { ...getState() };
      const term = selectors.currentTermOriginalData(newState);
      const termTranslationOriginal = term.valueTranslated;
      const termTranslationByUser = selectors.currentTermValueTranslatedByUser(newState);

      const isValid = termTranslationOriginal.trim() === termTranslationByUser.trim();

      if (!isValid) {
        return set({
          ...newState,
          nextTerms: [...newState.nextTerms, { ...term }],
          shouldShowTermError: true,
          shouldShowContinueButton: true,
        });
      }

      set(goToNextTerm(newState, false));
    },

    handleClickOnContinueButton: () => {
      const newState = { ...getState(), shouldShowContinueButton: false, shouldShowTermError: false };

      if (newState.completedTerms.length === newState.initialTerms.length) {
        return set(newState);
      }

      set(goToNextTerm(newState, true));
    },
  }),
);

function goToNextTerm(
  oldState: LearningExerciseTermsMemorizationStoreState,
  isTranslationWithError: boolean,
): LearningExerciseTermsMemorizationStoreState {
  const newState = { ...oldState, shouldShowTermError: false };

  const nextItemIndexValue = oldState.currentTermData.index + 1;
  const shouldRestartCurrentItems = nextItemIndexValue + 1 > oldState.currentTerms.length;
  const term = selectors.currentTermOriginalData(oldState);

  if (shouldRestartCurrentItems) {
    return {
      ...newState,
      currentTermData: {
        ...initialState.currentTermData,
      },
      currentTerms: [...newState.nextTerms],
      nextTerms: [],
      completedTerms: isTranslationWithError ? oldState.completedTerms : [...newState.completedTerms, { ...term }],
    };
  }

  return {
    ...newState,
    currentTermData: {
      ...newState.currentTermData,
      index: newState.currentTermData.index + 1,
      valueTranslatedByUser: '',
    },
    completedTerms: isTranslationWithError ? oldState.completedTerms : [...newState.completedTerms, { ...term }],
  };
}
