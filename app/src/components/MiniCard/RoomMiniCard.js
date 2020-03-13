import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import {
  Button, Card, CardBody, CardImg, Col, Row, Label, Modal
} from 'reactstrap';
import './style.css';
import { URL_STATIC } from '../../configs/configs';
import { roomDelete } from '../../actions/index';
import iconShow from '../../assets/icons/lo-icon-edit.svg';
import iconDelete from '../../assets/icons/lo-icon-trash.svg';
import ConfirmDeleteRoom from '../PopUps/ConfirmDeleteRoom';
import ConfirmedDelete from '../PopUps/ConfirmedDelete';
import ConfirmDeletePassword from '../PopUps/ConfirmDeletePassword';


class RoomMiniCard extends Component {
  constructor(props) {
    super(props);
    this.renderCardItem = this.renderCardItem.bind(this);
    this.editRoom = this.editRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.showConfirmed = this.showConfirmed.bind(this);
    this.showConfirmDelete = this.showConfirmDelete.bind(this);
    this.showConfirmPassword = this.showConfirmPassword.bind(this);
    this.toggleConfirmedDeleteModal = this.toggleConfirmedDeleteModal.bind(this);
    this.toggleConfirmDeleteModal = this.toggleConfirmDeleteModal.bind(this);
    this.togglePasswordConfirmModal = this.togglePasswordConfirmModal.bind(this);

    this.state = {
      isConfirmDeleteModalOpen: false,
      isPasswordDeleteModalOpen: false,
      isConfirmedModalOpen: false

    };
  }

  showConfirmDelete() {
    this.setState({
      isConfirmDeleteModalOpen: true
    });
  }

  showConfirmPassword() {
    this.setState({
      isConfirmDeleteModalOpen: false,
      isPasswordDeleteModalOpen: true
    });
  }

  showConfirmed() {
    this.setState({
      isConfirmDeleteModalOpen: false,
      isPasswordDeleteModalOpen: false,
      isConfirmedModalOpen: true
    });
  }

  toggleConfirmDeleteModal(e) {
    this.setState(prev => ({
      isConfirmDeleteModalOpen: !prev.isConfirmDeleteModalOpen
    }));
  }

  toggleConfirmedDeleteModal(e) {
    this.setState(prev => ({
      isConfirmedModalOpen: !prev.isConfirmedModalOpen
    }));
  }

  togglePasswordConfirmModal(e) {
    this.setState(prev => ({
      isPasswordDeleteModalOpen: !prev.isPasswordDeleteModalOpen
    }));
  }

  editRoom() {
    this.props.history.push(`/create-room/profile/${this.props.id}`);
  }

  deleteRoom() {
    this.props.roomDelete(this.props.id);
  }


  renderHoverOptions() {
    return (
      <React.Fragment>
        <div className="hover_options">
          <button className="hover_options_button" onClick={this.editRoom}>
            <div className="hover_button_icon">
              <SVG src={iconShow} className="hover_edit_button_svg" />
            </div>

            <FormattedMessage
              id="hover_options.edit"
              defaultMessage="Edit"
            />

          </button>
          <button className="hover_options_button" onClick={this.showConfirmDelete}>
            <SVG src={iconDelete} className="hover_delete_button_svg" />
            <FormattedMessage
              id="hover_options.delete"
              defaultMessage="Delete"
            />
          </button>
        </div>
      </React.Fragment>
    );
  }

  renderCityCountry(city, country) {
    if (city !== undefined && country !== undefined) {
      if (city.length == 0) {
        return 'No city.';
      }
      if (city.length < 20) {
        return city;
      }
    }
    return 'No city';
  }

  renderCardItem(item) {
    return (
      <Card className={`lo_card first lo_card-${item._id} miniboat-card col${this.props.className}`}>
        <div className="minicard_boat_img_container">
          { item.photos.length > 0 ? (
            <CardImg top width="120%" src={`${URL_STATIC}files/${item.photos[0].filename}`} />
          ) : (
            <CardImg top width="120%" src="https://placehold.it/1200x1200" />
          )}
        </div>
        <CardBody className="minicard_boat_cardbody">
          <Row className="minicard_boat_name_container">
            {item.name ? item.name : 'No Name'}
          </Row>

          <Row className="minicard_boat_city_container yellow">
            {this.renderCityCountry(item.city, item.country)}
          </Row>

        </CardBody>
        {this.renderHoverOptions()}
      </Card>
    );
  }


  render() {
    return (
      <React.Fragment>
        {this.renderCardItem(this.props.item)}


        <Modal
          id="confirm_delete_room_modal"
          isOpen={this.state.isConfirmDeleteModalOpen}
          toggle={e => this.toggleConfirmDeleteModal(e)}
          size="lg"
        >
          <ConfirmDeleteRoom
            /* onConfirm={e => this.showConfirmPassword(e)} */
            onConfirm={e => this.deleteRoom(e)}
            onCancel={e => this.toggleConfirmDeleteModal(e)}
            onClose={e => this.toggleConfirmDeleteModal(e)}
          />
        </Modal>

        <Modal
          id="confirm_delete_password_modal"
          isOpen={this.state.isPasswordDeleteModalOpen}
          toggle={e => this.togglePasswordConfirmModal(e)}
          size="lg"
        >
          <ConfirmDeletePassword
            onConfirm={e => this.showConfirmed(e)}
            onClose={e => this.togglePasswordConfirmModal(e)}
          />
        </Modal>

        <Modal
          id="confirmed_delete_modal"
          isOpen={this.state.isConfirmedModalOpen}
          toggle={e => this.toggleConfirmedDeleteModal(e)}
          size="lg"
        >
          <ConfirmedDelete
            onConfirm={e => this.toggleConfirmedDeleteModal(e)}
            onClose={e => this.toggleConfirmedDeleteModal(e)}
          />
        </Modal>

      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  lang: state.locale.lang,
  rooms: state.room.rooms,
  loading: state.room.loading,
  page: state.room.page,
  records: state.room.records,
  perPage: state.room.perPage,
  totalPages: state.room.totalPages
});

export default connect(mapStateToProps, {
  roomDelete
})(RoomMiniCard);
