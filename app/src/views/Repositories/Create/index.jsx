import React, { Component, createRef } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
// import PropTypes from 'prop-types';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewButton from '../../../components/Buttons/NewButton';
import GoBack from '../../../components/GoBack';
import { validateHistory } from '../../../validators';

const editorRef = createRef();
// eslint-disable-next-line react/prefer-stateless-function
class Create extends Component {
  render() {
    const { history } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <GoBack history={history} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Crear Documento Nuevo</h3>
            <CKEditor
              ref={editorRef}
              onInit={editor => {
                console.log('Editor is ready to use!', editor);

                // Insert the toolbar before the editable area.
                editor.ui
                  .getEditableElement()
                  .parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                  );
              }}
              onChange={(event, editor) => console.log({ event, editor })}
              editor={DecoupledEditor}
              data="<p>Hello from CKEditor 5's DecoupledEditor!</p>"
              // config={ /* the editor configuration */ }
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: '16px' }}>
          <Col>
            <NewButton
              className="float-left MyEnterprisesNewButton custom-shadow"
              text="Guardar"
              onClick={() => console.log(editorRef.current.editor.getData())}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

Create.propTypes = {
  history: validateHistory.isRequired
};

export default Create;
