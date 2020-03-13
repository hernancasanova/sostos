import React, { Component } from 'react';
import { Col, Label, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import NotificationIcon from '../../../assets/icons/lo-icon-notification.svg';
import iconUser from '../../../assets/icons/lo-icon-user.svg';
import iconLogout from '../../../assets/icons/lo-icon-close.svg';
import './estilo.css';
// import { URL_STATIC } from '../../../configs/configs';
import { validateHistory, validateUser } from '../../../validators';
import AvatarSvg from '../../../containers/layouts/Header/avatarSvg';

class UserMenu extends Component {
  static isHamburguer(pathname) {
    return [
      '/',
      '/search',
      '/room',
      '/login',
      '/register',
      '/recover-password',
      '/reserve-success',
      '/checkout'
    ].includes(pathname)
      ? 'hamburguer'
      : '';
  }

  static formatName(originalName) {
    const parts = originalName.split(' ');
    let newName = parts[0];
    if (parts.length > 1) {
      if (parts[0].length + parts[1].length < 12) {
        newName += ` ${parts[1].length}`;
      } else {
        newName += ` ${parts[1][0]}.`;
      }
    }
    return newName;
  }

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.logout = this.logout.bind(this);
    this.goTo = this.goTo.bind(this);
  }

  toggleDropdown() {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen
    });
  }

  goTo(path) {
    const { history } = this.props;
    history.push(path);
  }

  logout() {
    const { logout, history } = this.props;
    logout();
    history.go('/');
  }

  render() {
    const { history, user } = this.props;
    const { location } = history;
    const { dropdownOpen } = this.state;
    const pathname = typeof location !== 'undefined' ? location.pathname : '';
    const { name } = user;
    const lousermenuClass = `lo-user-menu pull-right ${UserMenu.isHamburguer(pathname)}`;
    return (
      <Col md="4" className={lousermenuClass}>
        <ButtonDropdown
          isOpen={dropdownOpen}
          toggle={this.toggleDropdown}
          className="lo-user-menu-dropdown"
        >
          <DropdownToggle caret>
            <div className="lo-user-image-container custom-shadow">
              <div className="lo-user-image">
                <AvatarSvg />
              </div>
            </div>
            <div className="lo-user-menu-label">
              <Label>{name}</Label>
            </div>
            <div className="lo-user-notification">
              <img src={NotificationIcon} alt="notification-icon" />
            </div>
          </DropdownToggle>
          <DropdownMenu className="dropdownOpenMenu">
            <DropdownItem onClick={() => this.goTo('/profile')}>
              <SVG src={iconUser} className="lo-icon" />
              <span>My profile</span>
            </DropdownItem>
            <DropdownItem onClick={this.logout}>
              <SVG src={iconLogout} className="lo-icon" />
              <span>Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </Col>
    );
  }
}

UserMenu.propTypes = {
  history: validateHistory.isRequired, // <- Eliminar
  logout: PropTypes.func.isRequired,
  user: validateUser.isRequired
};

export default UserMenu;
