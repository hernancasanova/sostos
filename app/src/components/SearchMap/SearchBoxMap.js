import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import SVG from 'react-inlinesvg';
import './style.css';
import iconUser from '../../assets/icons/lo-icon-user.svg';
import iconMarker from '../../assets/icons/lo-icon-marker.svg';
import { Input } from '../form';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      loc: ''
    };
  }

  handleChange = address => {
    this.setState({ address: address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ loc: latLng }))
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="autocomplete-style-div">
            <Input
              id="popup_list"
              {...getInputProps({
                placeholder: '¿A dónde quieres ir?',
                className: 'autocomplete-style',
                type: 'text-icon',
                FormattedPlaceholderId: 'select_place',
                defaultPlaceholder: 'select_place',
                icon: iconMarker
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div></div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
