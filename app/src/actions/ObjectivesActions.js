import { OBJECTIVES_ADD, OBJECTIVES_DELETE, OBJECTIVES_EDIT } from '../actiontypes/objectives';

export const objectivesAdd = objective => ({
  type: OBJECTIVES_ADD,
  objective
});

export const objectivesDelete = objectives => ({
  type: OBJECTIVES_DELETE,
  objectives
});

export const objectivesEdit = objective => ({
  type: OBJECTIVES_EDIT,
  objective
});
