import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';


/* Returns latitude and longitude when clicked */
function mapClickHandler(event, props) {
  const response = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng()
  };
  if (props.onClick !== undefined) {
    props.onClick(response);
  }
}

/* Google Map Configuration */
const MyGoogleMap = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBSvideE8GJA16Jvd_6mvGRArXC2JyiQRY&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '300px' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultOptions={{ mapTypeControl: false, streetViewControl: false }}
    defaultZoom={6}
    defaultCenter={{ lat: props.center_lat, lng: props.center_lng }}
    center={new window.google.maps.LatLng(props.center_lat, props.center_lng)}
    onClick={e => mapClickHandler(e, props)}
  >
    {props.isMarkerShown && (
      <Marker position={{
        lat: props.marker_lat !== undefined ? props.marker_lat : 0,
        lng: props.marker_lng !== undefined ? props.marker_lng : 0
      }}
      />
    )}
  </GoogleMap>
));

export default MyGoogleMap;
