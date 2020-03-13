import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Input } from '../../components/form';
import { Input as RSInput, Label, CustomInput, FormFeedback, Button, Col, Row, Fade, Card, CardImg, CardHeader, CardBody, CardFooter, FormGroup} from 'reactstrap';
import {
    userNameChanged,
    userLastNameChanged,
    userEmailChanged,
    userRoleChanged,
    userPasswordChanged,
    userConfirmedPasswordChanged,
    userGet,
    userUpdate,
    roleListRequest,
    userAvatarChanged
} from '../../actions/index';



class EditUser extends Component {
    constructor(props) {
        super(props);
        this.fileUpload = React.createRef();
        this.showFileUpload = this.showFileUpload.bind(this);
    }

    showFileUpload = (event) => {
        event.preventDefault();
        this.fileUpload.current.click();
    }

    componentWillMount() {
        this.props.roleListRequest();
        this.props.userGet(this.props.match.params.id);
    }

    onNameChange = (event) => {
        this.props.userNameChanged(event.target.value);
    }

    onLastNameChange = (event) => {
        this.props.userLastNameChanged(event.target.value);
    }

    onEmailChange = (event) => {
        this.props.userEmailChanged(event.target.value);
    }

    onRoleChange = (event) => {
        this.props.userRoleChanged(event.target.value);
    }

    onPasswordChange = (event) => {
        this.props.userPasswordChanged(event.target.value);
    }

    onConfirmedPasswordChange = (event) => {
        this.props.userConfirmedPasswordChanged(event.target.value);
    }

    onAvatarChange = (event) => {
        let files = event.target.files || event.dataTransfer.files;
        if (!files.length) return;

        this.createImage(files[0]);
    }

    createImage = (file) => {
        let reader = new FileReader();
        reader.onload = (event) => {
            this.props.userAvatarChanged(event.target.result);
        };
        reader.readAsDataURL(file);
    }

    updateUser() {
        let id = this.props.user.id
        const { name , lastname, password, confirmedPassword, email, role_id } = this.props;
        let data =  { id, name, lastname, password, confirmedPassword, email, role_id };
        if(this.props.password == "") {
            data = { id, name, lastname, confirmedPassword, email, role_id }
        }
        this.props.userUpdate(data);
    }

    gotoUsers = () => {
        this.props.history.push('/users');
    }

    render() {
        let { loadingRoles,  loading } = this.props;

        if(loading || loadingRoles || global._.size(this.props.user) == 0) {
            return (
                <Row>Loading...</Row>
            );
        }

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm ="3">
                        <Card>
                           <CardBody>
                               <Row xs="12" sm="12" xl="12" className="align-items-center justify-content-center">
                                   <Col sm="12" className="text-center">
                                       <input
                                           ref={ this.fileUpload }
                                           style={{ display: "none" }}
                                           id="file"
                                           type="file"
                                           name="file"
                                           accept=".jpg,.jpeg,.png"
                                           onChange={ this.onAvatarChange.bind(this) }
                                       />
                                       <FormGroup>
                                           <img
                                               width={150}
                                               height={150}
                                               src={ this.props.avatar }
                                               className="img-thumbnail img-fluid"
                                               alt="avatar"
                                           />
                                       </FormGroup>
                                   </Col>
                               </Row>
                               <Row xs="12" sm="12" xl="12" className="align-items-center justify-content-center">
                                   <Col sm="12" className="text-center">
                                       <FormGroup>
                                           <Button
                                               color="primary"
                                               block
                                               onClick={ this.showFileUpload }
                                           >
                                               Cambiar Imagen
                                           </Button>
                                       </FormGroup>
                                   </Col>
                               </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="9">
                        <Card>
                            <CardHeader>
                                <strong>Editar Usuario</strong>
                                <small> Editar un usuario</small>
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
                                                value={ this.props.name }
                                                onChange={ this.onNameChange.bind(this) }
                                                errors={ this.props.errors }
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
                                                value={ this.props.lastname }
                                                onChange={ this.onLastNameChange.bind(this) }
                                                errors={ this.props.errors }
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
                                                value={ this.props.email }
                                                onChange={ this.onEmailChange.bind(this) }
                                                errors={ this.props.errors }
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
                                                value={ this.props.role_id}
                                                onChange={ this.onRoleChange.bind(this) }
                                                errors={ this.props.errors }
                                                options= { this.props.roles }
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
                                                value={ this.props.password }
                                                onChange={ this.onPasswordChange.bind(this) }
                                                errors={ this.props.errors }
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
                                                value={ this.props.confirmedPassword }
                                                onChange={ this.onConfirmedPasswordChange.bind(this) }
                                                errors={ this.props.errors }
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Input
                                                readOnly
                                                label="F. Creación"
                                                type="text"
                                                id="created_at"
                                                value={ this.props.user.created_at }

                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <FormGroup>
                                            <Input
                                                readOnly
                                                label="F. Modificación"
                                                type="text"
                                                id="updated_at"
                                                value={ this.props.user.updated_at }
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Row xs="12" sm="12">
                                    <Col  sm={{ size:3, offset:6}} className="mb-2">
                                        <Button
                                            block
                                            color="primary"
                                            onClick={ this.updateUser.bind(this) }
                                        >
                                            <i className="fa fa-save"></i><span> Guardar</span>
                                        </Button>
                                    </Col>
                                    <Col sm={{ size:3, offset:0}}>
                                        <Button
                                            block
                                            color="secondary"
                                            onClick={ this.gotoUsers.bind(this) }
                                        >
                                            <i className="fa fa-close"></i><span> Cancelar</span>
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

const mapStateToProps = (state) => {
    return {
        avatar: state.user.avatar,
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


export default connect(mapStateToProps, {
    userNameChanged,
    userLastNameChanged,
    userEmailChanged,
    userRoleChanged,
    userPasswordChanged,
    userConfirmedPasswordChanged,
    userGet,
    userUpdate,
    roleListRequest,
    userAvatarChanged
})(EditUser);
