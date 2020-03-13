import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PropTypes } from 'prop-types';
import GoBack from '../../components/GoBack';
import MainContent from '../../containers/layouts/Master/mainContent';
import Input from '../../components/form/InputCustom/index';
import { profileUpdate } from '../../actions/ProfileActions';
import GenericModal from '../Groups/Item/genericModal';
import { validateUser, validateHistory } from '../../validators';

class Profile extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      user,
      modal: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { user } = this.state;
    this.setState({
      user: Object.assign(user, { [e.target.name]: e.target.value })
    });
  }

  handleSubmit() {
    const { user } = this.state;
    const { reduxProfileUpdate } = this.props;
    reduxProfileUpdate(user);
    this.setState({ modal: true });
  }

  render() {
    const { history } = this.props;
    const { user, modal } = this.state;
    const { name, email, password, rut } = user;
    return (
      <MainContent token aside>
        <Container>
          <Row>
            <Col>
              <GoBack history={history} />
              <Input label="Rut" value={rut} name="rut" onChange={this.handleChange} />
              <Input label="Nombre" value={name} name="name" onChange={this.handleChange} />
              <Input label="Email" value={email} name="email" onChange={this.handleChange} />
              <Input
                label="Contraseña"
                value={password}
                name="password"
                onChange={this.handleChange}
              />
              <button type="button" className="NewButton" onClick={this.handleSubmit}>
                Guardar
              </button>
            </Col>
          </Row>
          <GenericModal
            modal={modal}
            handleClose={() => this.setState({ modal: false })}
            message="Perfil actualizado"
          />
        </Container>
      </MainContent>
    );
  }
}
const mapStateToProps = state => ({
  user: state.profile
});
Profile.propTypes = {
  history: validateHistory.isRequired,
  reduxProfileUpdate: PropTypes.func.isRequired,
  user: validateUser.isRequired
};

export default connect(
  mapStateToProps,
  { reduxProfileUpdate: profileUpdate }
)(Profile);
