import React from 'react';
import PropTypes from 'prop-types';
/* class AttendeeHeader extends Component {
    render(){
        return <th>HEADER</th>
    }
} */

const RenderHeaderArrow = (label, sortBy, ascendent, value) => {
  if (value === sortBy) {
    return ascendent ? `${label} ↑` : `${label} ↓`;
  }
  return label;
};

const AttendeeHeader = props => {
  const { clickHeader, ascendent, sortBy, header } = props;
  const { sortable, label, value } = header;
  return (
    <th
      className="attendees-load-attendee-header"
      style={sortable ? { cursor: 'pointer' } : {}}
      onClick={sortable ? () => clickHeader(value) : () => {}}
    >
      {RenderHeaderArrow(label, sortBy, ascendent, value, sortable)}
    </th>
  );
};

AttendeeHeader.propTypes = {
  clickHeader: PropTypes.func.isRequired,
  ascendent: PropTypes.bool.isRequired,
  sortBy: PropTypes.string.isRequired,
  header: PropTypes.shape({
    sortable: PropTypes.bool,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired
};

export default AttendeeHeader;
