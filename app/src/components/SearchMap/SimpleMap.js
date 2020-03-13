import React, { Component } from 'react';
import {
  withScriptjs, withGoogleMap, Marker, GoogleMap, Circle
} from 'react-google-maps';
import './style.css';

const AirbnbMap = withGoogleMap(props => (

  <GoogleMap
    ref={props.onMapMounted}
    defaultCenter={props.center}
    defaultZoom={props.zoom}
  >
    <Circle
      center={props.center}
      radius={150}
      options={{
        fillColor: '#f00',
        strokeColor: '#f00'
      }}
    />
  </GoogleMap>
));

export class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.mapFullyLoaded = false;
    this.zoom = 16;
    this.state = {
      lat: this.props.latInit ? this.props.latInit : 0,
      lng: this.props.lngInit ? this.props.lngInit : 0
    };
  }

  render() {
    const { lat, lng } = this.state;


    return (
      <div style={{ width: '100%', height: '500px' }}>
        <AirbnbMap
          center={{
            lat,
            lng
          }}
          zoom={this.zoom}
          containerElement={
            <div style={{ height: '100%', width:'100%' }} />
          }
          mapElement={
            <div style={{ height: '100%', width:'100%' }} />
          }
        />
      </div>
    );
  }
}
export default SimpleMap;
