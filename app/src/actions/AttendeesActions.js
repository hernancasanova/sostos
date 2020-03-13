import {
  ATTENDEES_ADD,
  ATTENDEES_DELETE,
  ATTENDEES_EDIT,
  ATTENDEES_ADD_FROM_XLXS
} from '../actiontypes/attendees';

export const attendeesAdd = (attendee, selectedInstitution, selectedGroup) => ({
  type: ATTENDEES_ADD,
  attendee,
  selectedInstitution,
  selectedGroup
});

export const attendeesDelete = attendees => ({
  type: ATTENDEES_DELETE,
  attendees
});

export const attendeesEdit = attendee => ({
  type: ATTENDEES_EDIT,
  attendee
});

export const attendeesAddFromXlxs = attendees => ({
  type: ATTENDEES_ADD_FROM_XLXS,
  attendees
});
