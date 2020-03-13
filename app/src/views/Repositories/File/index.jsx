import React from 'react';
import PropTypes from 'prop-types';
import { PDFViewer } from '@react-pdf/renderer';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import GoBack from '../../../components/GoBack';
import { validateHistory } from '../../../validators';
import SampleDocument from './document';

const File = props => {
  const { history, name } = props;
  return (
    <Container>
      <Row>
        <Col>
          <GoBack history={history} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>{name}</h3>
        </Col>
      </Row>
      <Row className="file-pdfviewer-row">
        <Col className="file-pdfviewer-col">
          <PDFViewer className="file-pdfviewer">
            <SampleDocument name={name} />
          </PDFViewer>
        </Col>
      </Row>
    </Container>
  );
};
//   ReactPDF.render(<Quixote />);
File.propTypes = {
  history: validateHistory.isRequired,
  name: PropTypes.string.isRequired
};

export default File;
