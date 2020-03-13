import React from 'react';

const Footer = props => {
  const { location } = props;
  const { pathname } = typeof location === 'undefined' ? '' : location.pathname;
  const availablePaths = ['confirmed', 'success', 'search', 'home', 'checkout'];
  const subs = typeof pathname === 'undefined' ? '' : pathname.substr(1, pathname.lenght);
  let path = '';
  if (subs.indexOf('/') !== -1) {
    const index = subs.indexOf('/');
    path = subs.substr(0, index);
  } else {
    path = subs;
  }
  if (availablePaths.includes(path)) {
    return <Footer />;
  }
  return false;
};
export default Footer;
