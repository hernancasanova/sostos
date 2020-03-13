import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Thumb from './thumb';
import ThumbOldFile from './thumbOldFile';
import logo from './logo.png';
import './style.css';
// import 'react-image-lightbox/style.css';
/* global fetch, File */

const dropzoneRef = React.createRef();
class ImageUploader extends Component {
  /* static base64ToFile(url) {
    // const url = 'data:image/png;base6....';
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'File name');
        return file;
      });
  } */

  constructor(props) {
    super(props);
    let files = [];
    const { oldFiles, image } = this.props;
    if (oldFiles !== undefined) {
      files = oldFiles.length > 0 ? oldFiles : [];
    }
    this.state = {
      files: [],
      oldFiles: files
    };
    this.closeThumb = this.closeThumb.bind(this);
    this.closeAndDeleteThumb = this.closeAndDeleteThumb.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.base64ToFile(image);
  }

  componentWillUnmount() {
    const { files } = this.state;
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  onDrop(acceptedFiles) {
    const { onDrop, id } = this.props;
    onDrop(acceptedFiles[0], id);
    this.setState({
      files: [Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0]) })]
    });
  }

  base64ToFile(url) {
    if (url) {
      fetch(url)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'File name');
          this.setState({
            files: [Object.assign(file, { preview: URL.createObjectURL(file) })]
          });
        });
    }
  }

  closeThumb(file) {
    const { removePhoto } = this.props;
    const { files } = this.state;
    const auxFiles = files;
    auxFiles.splice(auxFiles.indexOf(file), 1);
    removePhoto();
    this.setState({
      files: auxFiles
    });
  }

  closeAndDeleteThumb(id) {
    const { removePhoto } = this.props;
    const { oldFiles: stateOldFiles } = this.state;
    for (let i = 0; i < stateOldFiles.length; i += 1) {
      if (stateOldFiles[i]._id === id) {
        stateOldFiles.splice(i, 1);
      }
    }
    this.setState({
      //  oldFiles: auxFilesOld
    });
    removePhoto(id);
  }

  render() {
    // Para obtener los archivos del ImageUploader realziar lo siguiente
    // en el componente que lo contiene (componente padre)
    // 1.- Definir: const dropZone = React.createRef();
    // 2.- A la instancia del ImageUploader agregar: ref={dropZone}
    // 3.- Se pueden acceder con el siguiente código: dropZone.current.state.files
    const { files, oldFiles } = this.state;
    const { slim } = this.props;
    return (
      <section>
        <Dropzone ref={dropzoneRef} onDrop={this.onDrop} accept="image/*">
          {({
            getRootProps,
            getInputProps,
            // isDragActive,
            // isDragAccept,
            isDragReject
            // acceptedFiles,
            // rejectedFiles
          }) => {
            return (
              <div className={slim ? 'dropzone-sosto-slim' : 'dropzone-sosto'} {...getRootProps()}>
                <React.Fragment>
                  <div className="dropzone-content">
                    {oldFiles.length === 0 && files.length === 0 ? (
                      <React.Fragment>
                        <img
                          onClick={() => dropzoneRef.current.open()}
                          alt="upload logo"
                          className="logo"
                          src={logo}
                        />
                        <div className="title">
                          <FormattedMessage
                            id="image_uploader.title"
                            defaultMessage="Subir imagen"
                          />
                        </div>
                        <div className="subtitulo">
                          <FormattedMessage
                            id="image_uploader.text"
                            defaultMessage={
                              slim
                                ? 'Imagen relacionada a la alternativa'
                                : 'Imagen relacionada a la pregunta'
                            }
                          />
                        </div>
                      </React.Fragment>
                    ) : (
                      <div className="thumbs-container">
                        {files.map(file => (
                          <Thumb
                            slim={slim}
                            key={file.name}
                            file={file}
                            closeThumb={this.closeThumb}
                          />
                        ))}
                        {oldFiles.map(file => (
                          <ThumbOldFile
                            key={`old_file${file._id}`}
                            id={file._id}
                            filename={file.filename}
                            closeAndDeleteThumb={this.closeAndDeleteThumb}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  {!slim && (
                    <button
                      type="button"
                      onClick={() => dropzoneRef.current.open()}
                      className="boton"
                    >
                      <FormattedMessage id="image_uploader.button" defaultMessage="Subir fotos" />
                    </button>
                  )}
                </React.Fragment>
                {isDragReject && false && (
                  <div>
                    {
                      <FormattedMessage
                        id="image_uploader.unsupported"
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

ImageUploader.defaultProps = {
  slim: false
};

ImageUploader.propTypes = {
  slim: PropTypes.bool,
  onDrop: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  removePhoto: PropTypes.func.isRequired
};

export default ImageUploader;
