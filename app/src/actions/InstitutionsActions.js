import {
  INSTITUTIONS_DELETE,
  INSTITUTIONS_SELECT,
  INSTITUTIONS_ADD,
  INSTITUTIONS_EDIT
} from '../actiontypes/institutions';

export const institutionsDelete = list => ({
  type: INSTITUTIONS_DELETE,
  list
});

export const institutionsSelect = selectedInstitution => ({
  type: INSTITUTIONS_SELECT,
  selectedInstitution
});

export const institutionsAdd = institution => ({
  type: INSTITUTIONS_ADD,
  institution
});

export const institutionsEdit = institution => ({
  type: INSTITUTIONS_EDIT,
  institution
});
