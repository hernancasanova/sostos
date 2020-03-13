import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardHeader, Table, Card, CardBody, Col, Row, Fade, Button } from 'reactstrap';

import { userListRequest, userReset } from '../../actions';


class User extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.userListRequest();
    }

    gotoCreate = () => {
        this.props.history.push('/users/create');
    }

    gotoEdit(id) {
        let url = `/users/${id}`;
        this.props.history.push(url);
    }

    renderActions = (id) => {
        return (
            <td>
                <Button onClick={ this.gotoEdit.bind(this, id) } color="primary" className="ml-1 mb-1">
                    <i className="fa fa-pencil"></i>
                </Button>
                <Button color="danger" className="ml-1 mb-1">
                    <i className="fa fa-trash"></i>
                </Button>
            </td>
        );
    };

    renderUsersRows = () => {
        return global._.map(this.props.users, (user) => {
            return (
                <tr key={ user.id }>
                    <td>{ user.id }</td>
                    <td>{ user.name }</td>
                    <td>{ user.email }</td>
                    <td>{ user.role.name } </td>
                    <td>{ user.created_at }</td>
                    { this.renderActions(user.id) }
                </tr>
            );
        });
    }




    renderUsers = () => {
        let users  = this.props.users;
        if (global._.size(users) > 0) {
            return (
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"></i>
                        <strong>Listado de Usuarios</strong>
                    </CardHeader>
                    <CardBody>
                        <Table hover bordered striped responsive size="xs">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>E-Mail</th>
                                <th>Rol</th>
                                <th>Creación</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                                { this.renderUsersRows() }
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            );
        }

        return (
            <div>No existén datos...</div>
        );

    }

    render() {
        let { users, loading } = this.props;

        if(loading) {
            return (
                <Row>Loading...</Row>
            );
        }

        return (
            <div className="animated fadeIn">
                <Row sm={12}>
                    <Col sm={{size:2, offset: 10 }} className="mb-4" >
                        <Button
                            block
                            onClick={ this.gotoCreate.bind(this) }
                            color="primary"
                        >
                            <i className="fa fa-plus"> Nuevo</i>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12">
                        { this.renderUsers() }
                    </Col>
                </Row>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        users: state.user.users,
        loading: state.user.loading
    };
};


export default connect(mapStateToProps, { userListRequest, userReset })(User);
