import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { PDFViewer } from '@react-pdf/renderer';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PreviewQuestions from './previewQuestions';
import { validateQuestions } from '../../../validators';

const PreviewPDF = props => {
  const { modal, handleClose, questions, title } = props;
  return (
    <Modal className="preview-modal" show={modal} size="xl" onHide={handleClose}>
      <Modal.Body className="custom-modal-body">
        <Row className="preview-pdfviewer-row p-0 m-0">
          <Col className="preview-pdfviewer-col p-0 m-0">
            <PDFViewer className="preview-pdfviewer">
              <PreviewQuestions title={title} questions={questions} />
            </PDFViewer>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

PreviewPDF.defaultProps = {
  title: false
};

PreviewPDF.propTypes = {
  modal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  questions: validateQuestions.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default PreviewPDF;
