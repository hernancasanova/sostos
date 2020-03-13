/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import close from './close.png';

class Thumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  render() {
    const { visible } = this.state;
    const { file, closeThumb, slim } = this.props;
    const { name, preview } = file;
    return (
      <div className={slim ? 'thumb-slim' : 'thumb'}>
        <div className="inner-thumb">
          <img alt="close" onClick={() => closeThumb(file)} className="close-thumb" src={close} />
          <img
            alt={name}
            className="img-thumb"
            onClick={() => this.setState({ visible: true })}
            src={preview}
          />
          {visible && (
            <Lightbox onCloseRequest={() => this.setState({ visible: false })} mainSrc={preview} />
          )}
        </div>
      </div>
    );
  }
}
export default Thumb;
