import React, { Component } from 'react';
import { Marker } from 'react-google-maps';

import { PlaceInfoWindow } from './PlaceInfoWindow';
import './style.css';
import {
  Popover, Row, Col
} from 'reactstrap';

const { MarkerWithLabel } = require('react-google-maps/lib/components/addons/MarkerWithLabel');


export class PlaceMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTooltip: false
    };
  }

  clickTooltip() {
    this.setState({ showTooltip: !this.state.showTooltip });
  }

  closeWindow() {
    this.setState({ showTooltip: false });
  }

  render() {
    const { showTooltip } = this.state;
    const {
      lat, lng, name, price, description, id, photos
    } = this.props;

    return (
      <MarkerWithLabel
        position={{ lat, lng }}
        labelAnchor={new window.google.maps.Point(0, 0)}
        opacity={0}
        labelClass="map-price-container"
        key={`marker${id}`}
        onClick={this.clickTooltip.bind(this)}
      >
        <span>
          <div className="map-price-marker" id="hola">
            <span>
$
              {price}
            </span>
          </div>
          {showTooltip && (
            this.renderPopInfo('hola', description, name, price, photos)
          )}
        </span>
      </MarkerWithLabel>

    );
  }

  renderPopInfo(id, description, name, price, photos) {
    return (
      <Popover
        isOpen={this.state.showTooltip}
        target={id}
        placement="top"
      >
        <PlaceInfoWindow
          key={`info${id}`}
          description={description}
          name={name}
          price={price}
          photos={photos}
          closeWindow={this.closeWindow.bind(this)}
        />
      </Popover>
    );
  }
}

export default PlaceMarker;
