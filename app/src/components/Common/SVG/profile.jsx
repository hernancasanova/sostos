import React from 'react';
import PropTypes from 'prop-types';

const GroupsSVG = props => {
  const { active, width, height } = props;
  const colour = active ? '#cda555' : '#000000';
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 12C13.755 12 16 9.31 16 6C16 2.69 13.755 0 11 0C8.245 0 6 2.69 6 6C6 9.31 8.25 12 11 12ZM11 1.5C12.935 1.5 14.5 3.5 14.5 6C14.5 8.5 12.935 10.5 11 10.5C9.065 10.5 7.5 8.5 7.5 6C7.5 3.5 9.065 1.5 11 1.5Z"
        fill={colour}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.1866 12.0041C14.7623 11.9599 14.3839 12.2823 14.3415 12.7242C14.299 13.1661 14.6086 13.5601 15.0329 13.6043C17.4157 13.8959 19.2617 15.9125 19.4276 18.4051H1.57244C1.754 15.9197 3.59202 13.9119 5.96707 13.6043C6.39139 13.5601 6.70097 13.1661 6.65854 12.7242C6.6161 12.2823 6.23773 11.9599 5.81341 12.0041C5.75707 12.0041 0 12.6868 0 19.1999C0 19.6418 0.343976 20 0.768293 20H20.2317C20.656 20 21 19.6418 21 19.1999C21 12.6868 15.2429 12.0041 15.1866 12.0041Z"
        fill={colour}
      />
    </svg>
  );
};

GroupsSVG.propTypes = {
  active: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number
};

GroupsSVG.defaultProps = {
  active: false,
  width: 40,
  height: 40
};

export default GroupsSVG;
