import React from 'react';

const AttendeeCell = props => {
  const { id, edit, propsName, propsValue, changeAttendeeProp } = props;
  return (
    <td>
      {edit ? (
        <input
          type="text"
          onChange={e => changeAttendeeProp(id, propsName, e.target.value)}
          value={propsValue}
        />
      ) : (
        propsValue
      )}
    </td>
  );
};
export default AttendeeCell;
