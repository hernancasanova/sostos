import React from 'react';
import { Col } from 'reactstrap';
import Checkbox from '../../Checkbox';
import Select from '../../Select';

const options = [
  {
    id: 'null',
    name: 'Selecciona',
    value: null
  },
  {
    id: '1',
    name: '1',
    value: '1'
  },
  {
    id: '2',
    name: '2',
    value: '2'
  }
];

class BoatService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxChecked: false
    };

    this.renderService = this.renderService.bind(this);
    this.checkboxHandler = this.checkboxHandler.bind(this);
  }

  checkboxHandler() {
    this.setState({
      checkboxChecked: !this.state.checkboxChecked
    });
  }

  renderService() {
    return (
      <Col md="6" className="service-wrapper">
        <Col md="6" className="service_first_container" onClick={this.checkboxHandler}>
          <div className="service_cbox_container">
            <Checkbox id={this.props.id} checked={this.state.checkboxChecked} />
          </div>
          <div className="service_text_container">{this.props.name}</div>
        </Col>
        <Col md="5" className="service_secondary_container">
          <Select id={`select_${this.props.id}`} options={options} />
        </Col>
      </Col>
    );
  }

  render() {
    return <React.Fragment>{this.renderService()}</React.Fragment>;
  }
}

export default BoatService;
