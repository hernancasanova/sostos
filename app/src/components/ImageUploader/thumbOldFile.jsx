/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import { URL_STATIC } from '../../configs/configs';
import close from './close.png';

class ThumbOldFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  render() {
    const { id, closeAndDeleteThumb, filename } = this.props;
    const { visible } = this.state;
    return (
      <div className="thumb">
        <div className="inner-thumb">
          <img
            alt="close"
            onClick={() => closeAndDeleteThumb(id)}
            className="close-thumb"
            src={close}
          />
          <img
            alt="close-thumb"
            className="img-thumb"
            onClick={() => this.setState({ visible: true })}
            src={`${URL_STATIC}files/${filename}`}
          />
          {visible && (
            <Lightbox
              onCloseRequest={() => this.setState({ visible: false })}
              mainSrc={`${URL_STATIC}files/${filename}`}
            />
          )}
        </div>
      </div>
    );
  }
}
export default ThumbOldFile;
