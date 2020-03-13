import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloudSVG from './cloudSVG';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: '100%',
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const DropZone = () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img alt="" src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  return (
    <section className="container">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="custom-dropzone">
          <Row>
            <Col className="custom-dropzone-text">
              <p>Arrastra una imágen o haz click aquí para subir</p>
            </Col>
          </Row>
          <Row>
            <Col className="custom-dropzone-cloud">
              <CloudSVG />
            </Col>
          </Row>
        </div>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      {true && (
        <button onClick={() => console.log(files)} className="btn btn-primary" type="button">
          TEST
        </button>
      )}
    </section>
  );
};

export default DropZone;
