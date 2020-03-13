import React from 'react';
import PropTypes from 'prop-types';
import { validateAttendee } from '../../../validators';
import Error from '../../../components/Common/SVG/error';

const AttendeeRow = props => {
  // const attendee = props.attendee ↓;
  const { attendee, removeAttendee, repeated } = props;
  const { firstName, lastName, email, enrollment, rut, course, subject, year, id } = attendee;
  return (
    <tr className={repeated ? 'attendees-load-attendeerow-repeated' : ''}>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{enrollment}</td>
      <td>{rut}</td>
      <td>{course}</td>
      <td>{subject}</td>
      <td>{year}</td>
      <td>
        <div
          tabIndex={id}
          role="button"
          className="custom-shadow noselect"
          style={{
            margin: 'auto',
            width: '25px',
            height: '25px',
            cursor: 'pointer',
            borderRadius: '100px'
          }}
          onKeyUp={() => removeAttendee(id)}
          onClick={() => removeAttendee(id)}
        >
          <Error />
        </div>
      </td>
    </tr>
  );
};

AttendeeRow.defaultProps = {
  repeated: false
};

AttendeeRow.propTypes = {
  attendee: validateAttendee.isRequired,
  removeAttendee: PropTypes.func.isRequired,
  repeated: PropTypes.bool
};

export default AttendeeRow;
