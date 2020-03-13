import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Col, Row, Label
} from 'reactstrap';

import './style.css';

const Star = ({ selected = false, name, onClick = f => f }) => (
  <label className={(selected) ? `${'star-selected' + ' '}${name}` : `${'star-disable' + ' '}${name}`} onClick={onClick}>
    {selected ? '★' : '★'}
  </label>
);

class Stars extends Component {
  constructor(props) {
    super(props);
    this.state = { starsSelected: 0 };
    this.change = this.change.bind(this);
  }
  change(starsSelected) {
    this.setState({ starsSelected });
  }

  render(props) {
    const { totalStars } = this.props;
    const { starsSelected } = this.state;
    return (
      <React.Fragment>
        <div className="star-rating">
          {[...Array(totalStars)].map((n, i) => (
            <Star
              key={i}
              selected={i < starsSelected}
              onClick={() => this.change(i + 1)}
              name={`star_${i}`}
            />
          ))}
        </div>

      </React.Fragment>
    );
  }
}


export default Stars;
