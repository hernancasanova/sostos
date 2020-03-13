import _ from 'lodash';
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import BoatService from './BoatService';
import NewService from './NewBoatService';
import  AddButton from '../../AddButton/AddButton';


class ListBoatServices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newServices: [],
      serviceId: 0
    };

    this.addNewService = this.addNewService.bind(this);
    this.deleteNewService = this.deleteNewService.bind(this);
  }


  /* Adds new service to list */
  addNewService(event) {
    const newServices = this.state.newServices;
    newServices.push({
      key: `new_service__${this.state.serviceId}`,
      id: `new_service__${this.state.serviceId}`,
      callbackDelete: this.deleteNewService
    });

    this.setState(
      prevState => ({
        newServices,
        serviceId: prevState.serviceId + 1
      })
    );
  }

  /* Deletes clicked row from list */
  deleteNewService(id) {
    const newServices = this.state.newServices;
    for (let i = 0; i < newServices.length; i++) {
      if (newServices[i].id === id) {
        newServices.splice(i, 1);
      }
    }
    this.setState({ newServices });
  }


  /* Draw Services */
  renderServices(props) {
    const output = _.map(props.services, (service, index) => (
      <BoatService
        key={`service__${service.id}`}
        id={`service__${service.id}`}
        name={service.name}
      />
    ));
    return output;
  }

  /* Draws NewServices */
  renderNewServices(props) {
    const output = _.map(this.state.newServices, (service, index) => (
      <NewService
        key={service.id}
        id={service.id}
        callbackDelete={this.deleteNewService}
      />
    ));
    return output;
  }

  render() {
    return (
      <React.Fragment>
        <div className="services_main_container">
          {this.renderServices(this.props)}
        </div>
        <div className="addNewServices">

          {this.renderNewServices(this.props)}
          <AddButton
            FormattedMessageId="services.add_new_service"
            defaultMessage="Add a complementary service"
            onClick={e => this.addNewService()}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ListBoatServices;
