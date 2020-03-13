import {
  GROUPS_ADD,
  GROUPS_DELETE,
  GROUPS_EDIT,
  GROUPS_UNBIND_ATTENDEES,
  GROUPS_BIND_ATTENDEES,
  GROUPS_ADD_FROM_XLXS
} from '../actiontypes/groups';

export const groupsAdd = (group, selectedInstitution) => ({
  type: GROUPS_ADD,
  group,
  selectedInstitution
});

export const groupsDelete = groups => ({
  type: GROUPS_DELETE,
  groups
});

export const groupsUnbindAttendees = (group, attendees) => ({
  type: GROUPS_UNBIND_ATTENDEES,
  attendees,
  group
});

export const groupsBindAttendees = (group, attendees) => ({
  type: GROUPS_BIND_ATTENDEES,
  attendees,
  group
});

export const groupsEdit = group => ({
  type: GROUPS_EDIT,
  group
});

export const groupsAddFromXlxs = groups => ({
  type: GROUPS_ADD_FROM_XLXS,
  groups
});
