import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import './style.css';
import { FormattedMessage } from 'react-intl';
import { URL_STATIC } from '../../configs/configs';

const images = [
];

export default class CarouselLightbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false
    };
    for (let i = 0; i < this.props.photos.length; i++) {
      images[i] = [`${URL_STATIC}files/${this.props.photos[i].filename}`];
    }
  }

  render() {
    const { photoIndex, isOpen } = this.state;

    return (
      <div>
        <button type="button" className="white-button-detail anchor-button-detail" onClick={() => this.setState({ isOpen: true })}>
          <FormattedMessage
            id="buttons.see_photos"
            defaultMessage="See photos"
          />
        </button>

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() => this.setState({
              photoIndex: (photoIndex + images.length - 1) % images.length
            })
            }
            onMoveNextRequest={() => this.setState({
              photoIndex: (photoIndex + 1) % images.length
            })
            }
          />
        )}
      </div>
    );
  }
}
