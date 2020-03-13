/* eslint-disable no-case-declarations */
import { ASIGNATIONS_ADD } from '../actiontypes/asignations';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  const { type, group, attendees, questions, evaluation } = action;

  switch (type) {
    case ASIGNATIONS_ADD:
      const groupAsignation = Object.assign({}, group);
      const evaluationAsignation = Object.assign({}, evaluation);
      const attendeesAsignation = attendees.map(attendee => Object.assign({}, attendee));
      const questionsAsignation = questions.map(question => Object.assign({}, question));

      return state.concat({
        id: state.length + 1,
        group: groupAsignation,
        attendees: attendeesAsignation,
        evaluation: evaluationAsignation,
        questions: questionsAsignation,
        date: new Date().toLocaleString()
      });
    default:
      return state;
  }
};
