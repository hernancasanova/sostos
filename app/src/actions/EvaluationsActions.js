import {
  EVALUATIONS_ADD,
  EVALUATIONS_DELETE,
  EVALUATIONS_UNBIND_QUESTIONS,
  EVALUATIONS_BIND_QUESTIONS
} from '../actiontypes/evaluations';

export const evaluationsAdd = evaluation => ({
  type: EVALUATIONS_ADD,
  evaluation
});

export const evaluationsDelete = evaluations => ({
  type: EVALUATIONS_DELETE,
  evaluations
});

export const evaluationsUnbindQuestions = (evaluation, questions) => ({
  type: EVALUATIONS_UNBIND_QUESTIONS,
  questions,
  evaluation
});

export const evaluationsBindQuestions = (evaluation, questions) => ({
  type: EVALUATIONS_BIND_QUESTIONS,
  questions,
  evaluation
});
