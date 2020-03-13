import React, { Component } from 'react';
import './style.css';

class Footer extends Component {
  static pushTo(event) {
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <div className="Footer">© Copyright 2020. AllRemu es una marca Allware.</div>
      </React.Fragment>
    );
  }
}

export default Footer;
