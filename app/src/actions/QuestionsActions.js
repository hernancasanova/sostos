import { QUESTIONS_DELETE, QUESTIONS_ADD, QUESTIONS_EDIT } from '../actiontypes/questions';

export const questionsDelete = questions => ({
  type: QUESTIONS_DELETE,
  questions
});

export const questionsAdd = question => ({
  type: QUESTIONS_ADD,
  question
});

export const questionsEdit = question => ({
  type: QUESTIONS_EDIT,
  question
});
