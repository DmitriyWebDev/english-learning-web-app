import { createSelector } from 'reselect';
import { LearningExerciseTermsMemorizationStoreState } from './termsMemorization';
import isEqual from 'lodash/isEqual';

export type VisibleButtonKey = 'answer' | 'continue';

type State = LearningExerciseTermsMemorizationStoreState;

const rootData = createSelector(
  (state: State) => state,
  (state) => state,
);

const initialTerms = createSelector(rootData, (state) => state.initialTerms);

const visibleButtonKey = createSelector(
  rootData,
  ({ shouldShowContinueButton, shouldShowTermError }): VisibleButtonKey =>
    !shouldShowContinueButton && !shouldShowTermError ? 'answer' : 'continue',
);

const currentItemData = createSelector(
  (state: State) => state.currentTermData,
  (currentTermData) => currentTermData,
  { memoizeOptions: { equalityCheck: isEqual } },
);

const currentTermIndex = createSelector(currentItemData, ({ index }) => index);

const currentTermValueTranslatedByUser = createSelector(
  currentItemData,
  ({ valueTranslatedByUser }) => valueTranslatedByUser,
);

const currentTermOriginalData = createSelector(
  [initialTerms, currentTermIndex],
  (items, itemIndex) => items[itemIndex],
);

export const learningExerciseTermsMemorizationStoreSelectors = {
  visibleButtonKey,
  currentTermIndex,
  currentTermValueTranslatedByUser,
  currentTermOriginalData,
} as const;
