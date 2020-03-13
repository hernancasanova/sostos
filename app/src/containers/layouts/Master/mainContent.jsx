import React from 'react';
import { Col } from 'reactstrap';
import Footer from './footer';

const MainContent = props => {
  const { children, token, aside, location } = props;
  const size = token ? '9' : '12';
  const className = token && aside ? 'logged' : 'notlogged';
  return (
    <Col md={size} className={`main_col8 ${className}`}>
      <main id="page-wrap">
        {children}
        <Footer location={location} />
      </main>
    </Col>
  );
};

export default MainContent;
