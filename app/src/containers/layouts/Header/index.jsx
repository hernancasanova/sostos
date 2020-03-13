/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { Collapse, Navbar, Modal, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Login from '../../../views/Auth/Login';
import './style.css';
import { validateUser, validateHistory, validateInstitutions } from '../../../validators';
import InstitutionsSelect from './institutionsSelect';
import SubHeader from './subHeader';
import logo from '../../../assets/svg/logo.svg';
import PATHS from '../../../paths';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavbarOpen: false
    };
  }

  render() {
    const {
      institutions,
      isHamburger,
      isLoginModalOpen,
      pathnameIsSelectEnterprise,
      institutionsSelect,
      selectedInstitution,
      toggleLogin,
      toggleSignUp,
      user,
      logout,
      history,
      loading,
      signIn,
      errors,
      validated
    } = this.props;
    const { isNavbarOpen } = this.state;
    const navbarClass = `brand-logo-container ${isHamburger}`;
    const navbarColClass = `lo-header-brand ${isHamburger}`;
    return (
      <React.Fragment>
        <div>
          <Navbar color="light" light expand="md" className="lo_navbar">
            <Col md="3" className={navbarColClass}>
              <Link to={PATHS.HOME} className={navbarClass}>
                <img alt="logo sosto" src={logo} />
              </Link>

              {validated && (
                <div className="HeaderBrandSelectEnterprise">
                  <InstitutionsSelect
                    institutions={institutions}
                    pathnameIsSelectEnterprise={pathnameIsSelectEnterprise}
                    institutionsSelect={institutionsSelect}
                    selectedInstitution={parseInt(selectedInstitution, 10)}
                  />
                </div>
              )}
            </Col>
            {validated && (
              <Col md="4" className="HeaderSidebarSelectEnterprise">
                <InstitutionsSelect
                  institutions={institutions}
                  pathnameIsSelectEnterprise={pathnameIsSelectEnterprise}
                  institutionsSelect={institutionsSelect}
                  selectedInstitution={parseInt(selectedInstitution, 10)}
                />
              </Col>
            )}
            <Col md={validated ? 5 : 9}>
              <Collapse isOpen={isNavbarOpen} navbar>
                <SubHeader
                  loading={loading}
                  history={history}
                  logout={logout}
                  toggleLogin={toggleLogin}
                  toggleSignUp={toggleSignUp}
                  validated={validated}
                  user={user}
                />
              </Collapse>
            </Col>
          </Navbar>
          <Modal
            isOpen={isLoginModalOpen && !validated}
            toggle={() => toggleLogin(!isLoginModalOpen)}
            size="lg"
          >
            <Login history={history} errors={errors} loading={loading} signIn={signIn} />
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

Header.defaultProps = {
  isHamburger: '',
  user: null
};

Header.propTypes = {
  errors: PropTypes.oneOfType([PropTypes.shape({ error: PropTypes.string }), PropTypes.bool])
    .isRequired,
  loading: PropTypes.bool.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  toggleSignUp: PropTypes.func.isRequired,
  isLoginModalOpen: PropTypes.bool.isRequired,
  isHamburger: PropTypes.string,
  user: validateUser,
  institutionsSelect: PropTypes.func.isRequired,
  selectedInstitution: PropTypes.number.isRequired,
  pathnameIsSelectEnterprise: PropTypes.bool.isRequired,
  institutions: validateInstitutions.isRequired,
  logout: PropTypes.func.isRequired,
  history: validateHistory.isRequired,
  signIn: PropTypes.func.isRequired,
  validated: PropTypes.bool.isRequired
};

export default Header;
