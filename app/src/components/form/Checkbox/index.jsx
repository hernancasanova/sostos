import React, { Component } from 'react';
import './estilo.css';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    let checked = false;
    if (this.props.defaultChecked === true) {
      checked = true;
    }
    if (this.props.checked) {
      checked = this.props.checked;
    }
    this.state = { checked };
    this.change = this.change.bind(this);
  }

  change(e) {
    if (this.props.onChange) {
      if (this.props.cboxType !== 'yes_no') this.props.onChange(e.target.checked);
    }
  }

  render() {
    const className = this.props.className ? this.props.className : '';
    return (
      <React.Fragment>
        <label className={`checkbox-container ${className}`}>
          <input type="checkbox" checked={this.props.checked} onChange={this.change} />
          <span className="checkmark" />
        </label>
      </React.Fragment>
    );
  }
}

export default Checkbox;
