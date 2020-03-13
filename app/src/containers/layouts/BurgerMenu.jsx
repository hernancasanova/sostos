import React from 'react';
import { FormattedMessage } from 'react-intl';
import { slide as Menu } from 'react-burger-menu';

const BurgerMenu = () => {
  return (
    <React.Fragment>
      <Menu pageWrapId="page-wrap" outerContainerId="outer-container" isOpen>
        <ul className="flex-md-column flex-row navbar-nav w-100 justify-content-between">
          <li className="nav-item active">
            <button type="button" className="aside_link active">
              <FormattedMessage id="aside.new_project" defaultMessage="New project" />
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="aside_link ">
              <FormattedMessage id="aside.my_rooms" defaultMessage="My Spaces" />
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="aside_link ">
              <FormattedMessage id="aside.my_boats" defaultMessage="My boats" />
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="aside_link ">
              <FormattedMessage id="aside.calendar" defaultMessage="Calendar" />
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="aside_link ">
              <FormattedMessage id="aside.messages" defaultMessage="Messages" />
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="aside_link ">
              <FormattedMessage id="aside.chats" defaultMessage="Chats" />
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="aside_link ">
              <FormattedMessage id="aside.profile" defaultMessage="My profile" />
            </button>
          </li>
        </ul>
      </Menu>
    </React.Fragment>
  );
};

export default BurgerMenu;
