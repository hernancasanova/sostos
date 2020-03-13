import { ASIGNATIONS_ADD, ASIGNATIONS_DELETE } from '../actiontypes/asignations';

export const asignationsAdd = (group, attendees, evaluation, questions) => ({
  type: ASIGNATIONS_ADD,
  group,
  attendees,
  evaluation,
  questions
});

export const asignationsDelete = (groupId, evaluationId) => ({
  type: ASIGNATIONS_DELETE,
  groupId,
  evaluationId
});
