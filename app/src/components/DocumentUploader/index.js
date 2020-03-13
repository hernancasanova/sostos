import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Menu from './menu';
import Thumb from './thumb';
import logo from './logo.png';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';
import './style.css';
import 'react-image-lightbox/style.css';
const dropzoneRef = React.createRef();
class DocumentUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      leFlag: true
    };
    this.closeThumb = this.closeThumb.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop = (acceptedFiles /*, rejectedFiles*/) => {
    this.setState({
      files: this.state.files.concat(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    });
  };

  componentWillUnmount() {
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  closeThumb(file) {
    var auxFiles = this.state.files;
    auxFiles.splice(auxFiles.indexOf(file), 1);
    this.setState({
      files: auxFiles
    });
  }

  render() {
    // Para obtener los archivos del ImageUploader realziar lo siguiente
    // en el componente que lo contiene (componente padre)
    // 1.- Definir: const dropZone = React.createRef();
    // 2.- A la instancia del ImageUploader agregar: ref={dropZone}
    // 3.- Se pueden acceder con el siguiente código: dropZone.current.state.files
    return (
      <section>
        <Dropzone
          ref={dropzoneRef}
          disableClick
          onDrop={this.onDrop}
          accept="image/*,.txt,.csv,.xls,.pdf,.doc,.docm,.docx,.ppt,.pptx,.zip,.tgz,.rar"
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
            acceptedFiles,
            rejectedFiles
          }) => {
            return (
              <div className="dropzone-sosto" {...getRootProps()}>
                <input {...getInputProps()} />
                <div>
                  <Menu
                    empty={this.state.files.length === 0}
                    upload={
                      <FormattedMessage
                        id="document_uploader.menu_left"
                        defaultMessage="Subir Documentos"
                      />
                    }
                    view={
                      <FormattedMessage
                        id="document_uploader.menu_right"
                        defaultMessage="Ver archivos cargados"
                      />
                    }
                  />

                  <div className="dropzone-content">
                    {this.state.files.length === 0 ? (
                      <React.Fragment>
                        <img alt="upload image logo" className="logo" src={logo} />
                        <div className="title">
                          <FormattedMessage
                            id="document_uploader.title"
                            defaultMessage="Adjunta los documentos que te acretditem como empresa"
                          />
                        </div>
                      </React.Fragment>
                    ) : (
                      <div className="thumbs-container">
                        {this.state.files.map(file => (
                          <Thumb key={file.name} file={file} closeThumb={this.closeThumb} />
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    className="lo_secondary"
                    color="secondary"
                    onClick={() => dropzoneRef.current.open()}
                  >
                    <FormattedMessage
                      id="document_uploader.button"
                      defaultMessage="Seleccionar documentos"
                    />
                  </Button>
                </div>
                {isDragReject && (
                  <div>
                    {
                      <FormattedMessage
                        id="document_uploader.unsupported"
                        defaultMessage="Archivo no válido"
                      />
                    }
                  </div>
                )}
              </div>
            );
          }}
        </Dropzone>
      </section>
    );
  }
}
export default DocumentUploader;
