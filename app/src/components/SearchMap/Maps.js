import React, { Component } from 'react'
import { withScriptjs,withGoogleMap, GoogleMap} from 'react-google-maps'
import { PlaceMarker } from './PlaceMarker'
import _ from 'lodash';
import './style.css';

const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");


const AirbnbMap = withGoogleMap(props => (

  <GoogleMap
    ref={props.onMapMounted}
    onZoomChanged={props.handleMapChanged}
    onDragEnd={props.handleMapChanged}
    onBoundsChanged={props.handleMapFullyLoaded}
    defaultCenter={props.center}
    defaultZoom={props.zoom}
  >
    {
      props.places.length > 0 && props.places.map(place => (
      <PlaceMarker 
                     key={`place${place._id}`}
                     id={place._id}
                     lat={place.loc.coordinates[1]}
                     lng={place.loc.coordinates[0]}
                     name={place.name}
                     price={place.costPerNight}
                     photos={place.photos} />

      ))

    }
  </GoogleMap>
));

export class Maps extends Component {
  constructor(props) {
    super(props)

    this.xMapBounds = { min: null, max: null }
    this.yMapBounds = { min: null, max: null }

    this.mapFullyLoaded = false
    this.zoom = 9
    this.state = {
      places:[],
      lat: this.props.latInit?this.props.latInit:0,
      lng: this.props.lngInit?this.props.lngInit:0
    };
  }

  handleMapChanged() {
    this.getMapBounds()
    this.setMapCenterPoint()
    this.fetchPlacesFromApi()
  }

  handleMapMounted(map) {
    this.map = map
  }

  handleMapFullyLoaded() {
    if (this.mapFullyLoaded)
      return

    this.mapFullyLoaded = true
    this.handleMapChanged()
  }

  setMapCenterPoint() {
    this.setState({
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
    })
  }

  fetchPlacesFromApi() {
    let rooms = _.map(this.props.items);
    this.setState({ places:  rooms });

  }


    getMapBounds() {
    var mapBounds = this.map.getBounds()
    var north = mapBounds.getNorthEast();
    var west =  mapBounds.getSouthWest();

    this.xMapBounds.min = west.lng()
    this.xMapBounds.max = north.lng()

    this.yMapBounds.min = west.lat()
    this.yMapBounds.max = north.lat()
  }


  render() {
    const {lat, lng, places} = this.state
    

    return(
      <div style={{width: `750px`, height: `750px`}}>
        {/*<ul>
            <li>lng: {lng}</li>
            <li>lat: {lat}</li>
            <li>xMapBounds.min: {this.xMapBounds.min}</li>
            <li>xMapBounds.max: {this.xMapBounds.max}</li>
            <li>yMapBounds.min: {this.yMapBounds.min}</li>
            <li>yMapBounds.max: {this.yMapBounds.max}</li>
        </ul>*/}
        <AirbnbMap

          onMapMounted={this.handleMapMounted.bind(this)}
          handleMapChanged={this.handleMapChanged.bind(this)}
          handleMapFullyLoaded={this.handleMapFullyLoaded.bind(this)}
          center={{
            lat: lat,
            lng: lng
          }}
          places={places}
          zoom={this.zoom}
          containerElement={
            <div style={{ height: `100%` ,width:`100%` }} />
          }
          mapElement={
            <div style={{ height: `100%`,width:`100%` }} />
          }
        ></AirbnbMap>
      </div>
    );
  }
}
export default Maps