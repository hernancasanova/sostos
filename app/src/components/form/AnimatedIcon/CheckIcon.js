import _ from 'lodash';
import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';

import './CheckIcon.css';

class Select extends Component {
	constructor(props) {
		super(props);
		this.check = React.createRef();
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.check.current.style.visibility = "hidden";
		setTimeout(function () {
			this.check.current.style.visibility = "visible";
		}.bind(this), 10);
	}

	render() {
		return (
			<div>
			<div class="success-checkmark">
				<div ref={this.check} class="check-icon">
					<span class="icon-line line-tip"></span>
					<span class="icon-line line-long"></span>
					<div class="icon-circle"></div>
					<div class="icon-fix"></div>
				</div>
			</div>
			<center>
				<button onClick={this.handleChange}>Restart Animation</button>
			</center>
			</div>
		);
	}
}

export default Select;
