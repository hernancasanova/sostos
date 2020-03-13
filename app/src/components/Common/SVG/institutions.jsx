import React from 'react';
import PropTypes from 'prop-types';

const InstitutionsSVG = props => {
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
        d="M24.6331 18.7858H24.2172V13.6488H24.2417C24.4443 13.6488 24.6086 13.4845 24.6086 13.2818C24.6086 13.0792 24.4443 12.9149 24.2417 12.9149H17.5636V12.4746H18.3708C18.5392 12.4746 18.686 12.36 18.7268 12.1967C18.7677 12.0333 18.6921 11.8632 18.5435 11.7839L12.8669 8.7564V8.16932H14.8483C14.9755 8.16932 15.0936 8.10347 15.1605 7.9953C15.2273 7.88713 15.2334 7.75205 15.1765 7.6383L14.8672 7.01961L15.1765 6.40092C15.2334 6.28718 15.2273 6.1521 15.1605 6.04393C15.0936 5.93576 14.9755 5.86991 14.8483 5.86991H12.8669V5.84544C12.8669 5.6428 12.7026 5.47852 12.5 5.47852C12.2974 5.47852 12.1331 5.6428 12.1331 5.84544V8.7564L6.45651 11.7839C6.30793 11.8632 6.23234 12.0333 6.27319 12.1967C6.31399 12.36 6.46076 12.4746 6.62916 12.4746H7.4364V12.9149H0.758317C0.555675 12.9149 0.391389 13.0792 0.391389 13.2818C0.391389 13.4845 0.555675 13.6488 0.758317 13.6488H0.782779V18.7858H0.366928C0.164286 18.7858 0 18.95 0 19.1527C0 19.3553 0.164286 19.5196 0.366928 19.5196H24.6331C24.8357 19.5196 25 19.3553 25 19.1527C25 18.95 24.8357 18.7858 24.6331 18.7858ZM23.4834 13.6488V18.7858H17.5636V13.6488H23.4834ZM16.8297 18.7858H15.998V12.4746H16.8297V18.7858ZM10.5675 12.4746V18.7858H9.73581V12.4746H10.5675ZM11.3014 12.4746H12.1331V18.7858H11.3014V12.4746ZM12.8669 12.4746H13.6986V18.7858H12.8669V12.4746ZM14.4325 12.4746H15.2642V18.7858H14.4325V12.4746ZM14.2546 6.60376L14.1288 6.85552C14.0771 6.9588 14.0771 7.08042 14.1288 7.1837L14.2546 7.43546H12.8669V6.60376H14.2546ZM12.5 9.39241L16.9031 11.7407H8.09687L12.5 9.39241ZM9.00196 12.4746V18.7858H8.17025V12.4746H9.00196ZM1.51663 13.6488H7.4364V18.7858H1.51663V13.6488Z"
        fill={colour}
      />
      <path
        d="M6.23802 16.8281C6.03538 16.8281 5.87109 16.9924 5.87109 17.1951V17.5864C5.87109 17.7891 6.03538 17.9534 6.23802 17.9534C6.44066 17.9534 6.60495 17.7891 6.60495 17.5864V17.1951C6.60495 16.9924 6.44066 16.8281 6.23802 16.8281Z"
        fill={colour}
      />
      <path
        d="M5.06419 16.8281C4.86155 16.8281 4.69727 16.9924 4.69727 17.1951V17.5864C4.69727 17.7891 4.86155 17.9534 5.06419 17.9534C5.26684 17.9534 5.43112 17.7891 5.43112 17.5864V17.1951C5.43112 16.9924 5.26684 16.8281 5.06419 16.8281Z"
        fill={colour}
      />
      <path
        d="M3.89037 16.8281C3.68772 16.8281 3.52344 16.9924 3.52344 17.1951V17.5864C3.52344 17.7891 3.68772 17.9534 3.89037 17.9534C4.09301 17.9534 4.25729 17.7891 4.25729 17.5864V17.1951C4.25729 16.9924 4.09301 16.8281 3.89037 16.8281Z"
        fill={colour}
      />
      <path
        d="M2.71458 16.8281C2.51194 16.8281 2.34766 16.9924 2.34766 17.1951V17.5864C2.34766 17.7891 2.51194 17.9534 2.71458 17.9534C2.91723 17.9534 3.08151 17.7891 3.08151 17.5864V17.1951C3.08151 16.9924 2.91723 16.8281 2.71458 16.8281Z"
        fill={colour}
      />
      <path
        d="M6.23802 14.4805C6.03538 14.4805 5.87109 14.6448 5.87109 14.8474V16.0216C5.87109 16.2242 6.03538 16.3885 6.23802 16.3885C6.44066 16.3885 6.60495 16.2242 6.60495 16.0216V14.8474C6.60495 14.6448 6.44066 14.4805 6.23802 14.4805Z"
        fill={colour}
      />
      <path
        d="M5.06419 14.4805C4.86155 14.4805 4.69727 14.6448 4.69727 14.8474V16.0216C4.69727 16.2242 4.86155 16.3885 5.06419 16.3885C5.26684 16.3885 5.43112 16.2242 5.43112 16.0216V14.8474C5.43112 14.6448 5.26684 14.4805 5.06419 14.4805Z"
        fill={colour}
      />
      <path
        d="M3.89037 14.4805C3.68772 14.4805 3.52344 14.6448 3.52344 14.8474V16.0216C3.52344 16.2242 3.68772 16.3885 3.89037 16.3885C4.09301 16.3885 4.25729 16.2242 4.25729 16.0216V14.8474C4.25729 14.6448 4.09301 14.4805 3.89037 14.4805Z"
        fill={colour}
      />
      <path
        d="M2.71458 14.4805C2.51194 14.4805 2.34766 14.6448 2.34766 14.8474V16.0216C2.34766 16.2242 2.51194 16.3885 2.71458 16.3885C2.91723 16.3885 3.08151 16.2242 3.08151 16.0216V14.8474C3.08151 14.6448 2.91723 14.4805 2.71458 14.4805Z"
        fill={colour}
      />
      <path
        d="M22.2849 17.9534C22.4875 17.9534 22.6518 17.7891 22.6518 17.5864V17.1951C22.6518 16.9924 22.4875 16.8281 22.2849 16.8281C22.0823 16.8281 21.918 16.9924 21.918 17.1951V17.5864C21.918 17.7891 22.0823 17.9534 22.2849 17.9534Z"
        fill={colour}
      />
      <path
        d="M21.1111 17.9534C21.3137 17.9534 21.478 17.7891 21.478 17.5864V17.1951C21.478 16.9924 21.3137 16.8281 21.1111 16.8281C20.9084 16.8281 20.7441 16.9924 20.7441 17.1951V17.5864C20.7441 17.7891 20.9084 17.9534 21.1111 17.9534Z"
        fill={colour}
      />
      <path
        d="M19.9372 17.9534C20.1399 17.9534 20.3042 17.7891 20.3042 17.5864V17.1951C20.3042 16.9924 20.1399 16.8281 19.9372 16.8281C19.7346 16.8281 19.5703 16.9924 19.5703 17.1951V17.5864C19.5703 17.7891 19.7346 17.9534 19.9372 17.9534Z"
        fill={colour}
      />
      <path
        d="M18.7615 17.9534C18.9641 17.9534 19.1284 17.7891 19.1284 17.5864V17.1951C19.1284 16.9924 18.9641 16.8281 18.7615 16.8281C18.5588 16.8281 18.3945 16.9924 18.3945 17.1951V17.5864C18.3945 17.7891 18.5588 17.9534 18.7615 17.9534Z"
        fill={colour}
      />
      <path
        d="M22.2849 16.3885C22.4875 16.3885 22.6518 16.2242 22.6518 16.0216V14.8474C22.6518 14.6448 22.4875 14.4805 22.2849 14.4805C22.0823 14.4805 21.918 14.6448 21.918 14.8474V16.0216C21.918 16.2242 22.0823 16.3885 22.2849 16.3885Z"
        fill={colour}
      />
      <path
        d="M21.1111 16.3885C21.3137 16.3885 21.478 16.2242 21.478 16.0216V14.8474C21.478 14.6448 21.3137 14.4805 21.1111 14.4805C20.9084 14.4805 20.7441 14.6448 20.7441 14.8474V16.0216C20.7441 16.2242 20.9084 16.3885 21.1111 16.3885Z"
        fill={colour}
      />
      <path
        d="M19.9372 16.3885C20.1399 16.3885 20.3042 16.2242 20.3042 16.0216V14.8474C20.3042 14.6448 20.1399 14.4805 19.9372 14.4805C19.7346 14.4805 19.5703 14.6448 19.5703 14.8474V16.0216C19.5703 16.2242 19.7346 16.3885 19.9372 16.3885Z"
        fill={colour}
      />
      <path
        d="M18.7615 16.3885C18.9641 16.3885 19.1284 16.2242 19.1284 16.0216V14.8474C19.1284 14.6448 18.9641 14.4805 18.7615 14.4805C18.5588 14.4805 18.3945 14.6448 18.3945 14.8474V16.0216C18.3945 16.2242 18.5588 16.3885 18.7615 16.3885Z"
        fill={colour}
      />
      <path
        d="M11.7165 11.3003H13.2821C13.4847 11.3003 13.649 11.136 13.649 10.9333C13.649 10.7307 13.4847 10.5664 13.2821 10.5664H11.7165C11.5139 10.5664 11.3496 10.7307 11.3496 10.9333C11.3496 11.136 11.5139 11.3003 11.7165 11.3003Z"
        fill={colour}
      />
    </svg>
  );
};

InstitutionsSVG.propTypes = {
  active: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number
};

InstitutionsSVG.defaultProps = {
  active: false,
  width: 40,
  height: 40
};

export default InstitutionsSVG;
