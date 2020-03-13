import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Input } from '../../components/form';
import { Button, Col, Row, Card, CardHeader, CardBody, CardFooter, FormGroup } from 'reactstrap';
import {
  userNameChanged,
  userLastNameChanged,
  userEmailChanged,
  userRoleChanged,
  userPasswordChanged,
  userConfirmedPasswordChanged,
  userCreate,
  roleListRequest
} from '../../actions/index';

class CreateUser extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.roleListRequest();
  }

  onNameChange = event => {
    this.props.userNameChanged(event.target.value);
  };

  onLastNameChange = event => {
    this.props.userLastNameChanged(event.target.value);
  };

  onEmailChange = event => {
    this.props.userEmailChanged(event.target.value);
  };

  onRoleChange = event => {
    this.props.userRoleChanged(event.target.value);
  };

  onPasswordChange = event => {
    this.props.userPasswordChanged(event.target.value);
  };

  onConfirmedPasswordChange = event => {
    this.props.userConfirmedPasswordChanged(event.target.value);
  };

  createUser = () => {
    const { name, lastname, password, confirmedPassword, email, role_id } = this.props;
    let password_confirmation = confirmedPassword;
    this.props.userCreate({ name, lastname, email, password, password_confirmation, role_id });
  };

  gotoUsers = () => {
    this.props.history.push('/users');
  };

  render() {
    let { loadingRoles, loading } = this.props;

    if (loading || loadingRoles) {
      return <Row>Loading...</Row>;
    }

    if (global._.size(this.props.user) > 0) {
      if (this.props.user.code == 201) {
        let url = `/users/${this.props.user.data.id}`;
        return <Redirect to={{ pathname: url }} />;
      }
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Nuevo Usuario</strong>
                <small> Ingresa un nuevo usuario</small>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" sm="6">
                    <FormGroup>
                      <Input
                        label="Nombre"
                        type="text"
                        id="name"
                        placeholder="Ingrese el nombre"
                        value={this.props.name}
                        onChange={this.onNameChange.bind(this)}
                        errors={this.props.errors}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" sm="6">
                    <FormGroup>
                      <Input
                        label="Apellido"
                        type="text"
                        id="lastname"
                        placeholder="Ingrese el apellido"
                        value={this.props.lastname}
                        onChange={this.onLastNameChange.bind(this)}
                        errors={this.props.errors}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="6">
                    <FormGroup>
                      <Input
                        label="E-Mail"
                        type="text"
                        id="email"
                        placeholder="Ingrese el e-mail"
                        value={this.props.email}
                        onChange={this.onEmailChange.bind(this)}
                        errors={this.props.errors}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" sm="6">
                    <FormGroup>
                      <Input
                        label="Rol"
                        type="select"
                        id="role"
                        name="role"
                        value={this.props.role_id}
                        onChange={this.onRoleChange.bind(this)}
                        errors={this.props.errors}
                        options={this.props.roles}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="6">
                    <FormGroup>
                      <Input
                        label="Contraseña"
                        type="password"
                        id="password"
                        placeholder="Ingrese su contraseña"
                        value={this.props.password}
                        onChange={this.onPasswordChange.bind(this)}
                        errors={this.props.errors}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" sm="6">
                    <FormGroup>
                      <Input
                        label="Confirme Contraseña"
                        type="password"
                        id="confirmedPassword"
                        placeholder="Confirme su contraseña"
                        value={this.props.confirmedPassword}
                        onChange={this.onConfirmedPasswordChange.bind(this)}
                        errors={this.props.errors}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Row xs="12" sm="12">
                  <Col sm={{ size: 3, offset: 6 }} className="mb-2">
                    <Button block color="primary" onClick={this.createUser.bind(this)}>
                      <i className="fa fa-plus"></i>
                      <span> Nuevo Usuario</span>
                    </Button>
                  </Col>
                  <Col sm={{ size: 3, offset: 0 }}>
                    <Button block color="secondary" onClick={this.gotoUsers.bind(this)}>
                      <i className="fa fa-close"></i>
                      <span> Cancelar</span>
                    </Button>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.user.name,
    lastname: state.user.lastname,
    email: state.user.email,
    role_id: state.user.role_id,
    password: state.user.password,
    confirmedPassword: state.user.confirmedPassword,
    loading: state.user.loading,
    user: state.user.user,
    roles: state.role.datas,
    loadingRoles: state.role.loading,
    errors: state.user.errors
  };
};

export default connect(
  mapStateToProps,
  {
    userNameChanged,
    userLastNameChanged,
    userEmailChanged,
    userRoleChanged,
    userPasswordChanged,
    userConfirmedPasswordChanged,
    userCreate,
    roleListRequest
  }
)(CreateUser);
