import React, { Component } from 'react';
import { Card, CardBody, CardImg } from 'reactstrap';
// import { FormattedMessage } from 'react-intl';
import Checkbox from '../Checkbox';
import './style.css';

class RoomType extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked };
  }

  clickHandler(id) {
    this.setState({ checked: true });
    if (this.props.onClick !== undefined) {
      this.props.onClick(id);
    }
  }

  renderRoomType(props) {
    const className = this.props.checked ? 'active' : '';

    if (props.FormattedMessageId) {
      return (
        <div
          className={`lo_card_container ${className}`}
          onClick={e => this.clickHandler(this.props.id)}
        >
          <Card className="lo_card_room_type">
            <CardImg top width="100px" src={this.props.imgSrc} />
            <CardBody>
              <Checkbox
                id={this.props.id}
                className="room_type_cbox"
                checked={this.props.checked}
              />
            </CardBody>
          </Card>
          <div className="bold">{this.props.defaultMessage}</div>
        </div>
      );
    }
  }

  render() {
    return <React.Fragment>{this.renderRoomType(this.props)}</React.Fragment>;
  }
}

export default RoomType;
