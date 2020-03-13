import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import SVG from 'react-inlinesvg';
import {
  Button, Card, CardBody, CardImg, Col, Row, Label, Modal
} from 'reactstrap';
import './style.css';
import { URL_STATIC } from '../../configs/configs';
import { boatDelete } from '../../actions/index';
import iconEdit from '../../assets/icons/lo-icon-edit.svg';
import iconDelete from '../../assets/icons/lo-icon-trash.svg';
import ConfirmDeleteBoat from '../PopUps/ConfirmDeleteBoat';
import ConfirmedDelete from '../PopUps/ConfirmedDelete';
import ConfirmDeletePassword from '../PopUps/ConfirmDeletePassword';


class BoatMiniCard extends Component {
  constructor(props) {
    super(props);
    this.renderCardItem = this.renderCardItem.bind(this);
    this.showConfirmDelete = this.showConfirmDelete.bind(this);
    this.showConfirmPassword = this.showConfirmPassword.bind(this);
    this.showConfirmed = this.showConfirmed.bind(this);
    this.toggleConfirmedDeleteModal = this.toggleConfirmedDeleteModal.bind(this);
    this.toggleConfirmDeleteModal = this.toggleConfirmDeleteModal.bind(this);
    this.togglePasswordConfirmModal = this.togglePasswordConfirmModal.bind(this);
    this.editBoat = this.editBoat.bind(this);
    this.deleteBoat = this.deleteBoat.bind(this);
    this.state = {
      isConfirmDeleteModalOpen: false,
      isPasswordDeleteModalOpen: false,
      isConfirmedModalOpen: false

    };
  }

  editBoat() {
    if (this.props.id !== undefined) {
      this.props.history.push(`/create-boat/profile/${this.props.id}`);
    }
  }

  deleteBoat() {
    this.props.boatDelete(this.props.id);
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


  renderHoverOptions() {
    return (
      <React.Fragment>
        <div className="hover_options">
          <button className="hover_options_button" onClick={this.editBoat}>
            <SVG src={iconEdit} className="hover_icon_edit" />
            <FormattedMessage
              id="hover_options.edit"
              defaultMessage="Edit"
            />
          </button>

          <button className="hover_options_button" onClick={this.showConfirmDelete}>
            <SVG src={iconDelete} className="hover_icon_delete" />
            <FormattedMessage
              id="hover_options.delete"
              defaultMessage="Delete"
            />
          </button>
        </div>
      </React.Fragment>
    );
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

          <Row className="minicard_boat_city_container">
            { item.city ? item.city : 'No city' }
            { ', '}
            {item.country ? item.country : 'No country'}
          </Row>

        </CardBody>
        {this.renderHoverOptions()}
      </Card>
    );
  }


  render() {
    console.log('renderBoatMini');
    console.log(this.props);
    return (
      <React.Fragment>
        {this.renderCardItem(this.props.item)}


        <Modal
          id="confirm_delete_room_modal"
          isOpen={this.state.isConfirmDeleteModalOpen}
          toggle={e => this.toggleConfirmDeleteModal(e)}
          size="lg"
        >
          <ConfirmDeleteBoat
            onConfirm2={e => this.showConfirmPassword(e)}
            onConfirm={e => this.deleteBoat(e)}
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
  lang: state.locale.lang
});

export default connect(mapStateToProps, {
  boatDelete
})(BoatMiniCard);
