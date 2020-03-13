import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GridLoader from 'react-spinners/GridLoader';
import { css } from '@emotion/core';
import MainContent from '../../containers/layouts/Master/mainContent';

const override = css`
  display: block;
  margin: auto;
  border-color: red;
  margin-top: 200px;
  margin-left: 50%;
`;

const Loading = () => {
  return (
    <MainContent>
      <Container>
        <Row>
          <Col className="loading-container">
            <GridLoader
              css={override}
              sizeUnit="px"
              color="#FF7E00"
              size={30}
              margin="6px"
              loading
            />
          </Col>
        </Row>
      </Container>
    </MainContent>
  );
};

export default Loading;
