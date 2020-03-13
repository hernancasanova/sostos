import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import '../../assets/fonts/fonts.css';
import '../../styles/main.css';
import '../../index.css';
import PATHS from '../../paths';
import Profile from '../Profile';
import Aside from '../../containers/layouts/Aside';
import Header from '../../containers/layouts/Header';
import {
  getMe,
  logout,
  toggleLoginModal,
  toggleSignUpModal,
  signIn
} from '../../actions/AuthActions';
import { toggleSidebar } from '../../actions/SidebarActions';
import { institutionsSelect } from '../../actions/InstitutionsActions';
import {
  validateHistory,
  validateRouter,
  validateUser,
  validateInstitutions
} from '../../validators';
import Login from '../Login';
import Groups from '../Groups';
import Attendees from '../Attendees';
import Topics from '../Topics';
import Evaluations from '../Evaluations';
import Questions from '../Questions';
import Repositories from '../Repositories';
import Institutions from '../Institutions';
import Objectives from '../Objectives';
import Welcome from '../Welcome';
import Loading from '../Loading';

class App extends Component {
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

  static validateUser(user) {
    return user !== null && Object.keys(user).length > 0;
  }

  // Si debería iniciar las funciones iniciales o no
  static validateUsers(prevUser, user) {
    return !App.validateUser(prevUser) && App.validateUser(user);
  }

  static pathnameIsSelectEnterprise(pathname) {
    return pathname === PATHS.SELECT_ENTERPRISE;
  }

  componentDidMount() {
    const { reduxGetMe, user } = this.props;
    //
    if (!App.validateUser(user)) {
      reduxGetMe();
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    const { user: prevUser } = prevProps;
    if (App.validateUsers(prevUser, user)) {
      // #region Funciones cuando recién detecta al usuario
      // #endregion
    }
  }

  render() {
    const {
      token,
      user,
      isLoginModalOpen,
      isSignUpModalOpen,
      selectedInstitution,
      authLoading,
      router,
      history,
      reduxInstitutionsSelect,
      reduxGetMe,
      reduxLogout,
      reduxToggleLoginModal,
      reduxToggleSignUpModal,
      reduxSignIn,
      institutions,
      authErrors
    } = this.props;
    const { location } = router;
    const { pathname } = location;
    const validated = App.validateUser(user);
    return (
      <ConnectedRouter history={history}>
        <div className="app">
          <Header
            errors={authErrors}
            loading={authLoading}
            history={history}
            institutions={institutions.sort((a, b) => {
              if (a.id > b.id) {
                return -1;
              }
              return 1;
            })}
            isHamburguer={false}
            isLoginModalOpen={isLoginModalOpen}
            isSignUpModalOpen={isSignUpModalOpen}
            logout={reduxLogout}
            pathnameIsSelectEnterprise={false}
            institutionsSelect={reduxInstitutionsSelect}
            selectedInstitution={selectedInstitution}
            toggleLogin={reduxToggleLoginModal}
            toggleSignUp={reduxToggleSignUpModal}
            signIn={reduxSignIn}
            user={user}
            validated={validated}
          />
          <div className="app-body">
            <div className="h-100" id="outer-container">
              {authLoading && <Loading />}
              {validated && (
                <React.Fragment>
                  <Aside
                    reduxGetMe={reduxGetMe}
                    reduxToggleSidebar={toggleSidebar}
                    reduxLogout={reduxLogout}
                    user={user}
                    token={token}
                    pathname={pathname}
                  />
                  <Switch>
                    <Route exact path={PATHS.HOME} component={Welcome} />

                    <Route component={Groups} path={`${PATHS.GROUPS_PRE_SINGLE}:id`} exact />
                    <Route component={Groups} path={`${PATHS.GROUPS_EDIT}:id`} exact />
                    <Route component={Groups} path={PATHS.GROUPS} />

                    <Route component={Attendees} path={`${PATHS.ATTENDEES_PRE_SINGLE}:id`} exact />
                    <Route component={Attendees} path={PATHS.ATTENDEES} />

                    <Route component={Topics} path={`${PATHS.TOPICS_PRE_SINGLE}:id`} exact />
                    <Route component={Topics} path={PATHS.TOPICS} />

                    <Route
                      component={Evaluations}
                      path={`${PATHS.EVALUATIONS_PRE_SINGLE}:id`}
                      exact
                    />
                    <Route component={Evaluations} path={PATHS.EVALUATIONS} />

                    <Route component={Questions} path={`${PATHS.QUESTIONS_PRE_SINGLE}:id`} exact />
                    <Route component={Questions} path={PATHS.QUESTIONS} />

                    <Route
                      component={Repositories}
                      path={`${PATHS.REPOSITORIES_PRE_SINGLE}:id`}
                      exact
                    />
                    <Route component={Repositories} path={PATHS.REPOSITORIES} />

                    <Route
                      component={Objectives}
                      path={`${PATHS.OBJECTIVES_PRE_SINGLE}:id`}
                      exact
                    />

                    <Route exact component={Profile} path={PATHS.PROFILE} />

                    <Route component={Objectives} path={PATHS.OBJECTIVES} />

                    <Route path={PATHS.FILES} component={Repositories} />
                    <Route
                      component={Institutions}
                      path={`${PATHS.INSTITUTIONS_PRE_SINGLE}:id`}
                      exact
                    />
                    <Route component={Institutions} path={PATHS.INSTITUTIONS} />
                  </Switch>
                </React.Fragment>
              )}
              {!validated && !authLoading && (
                <Switch>
                  <Route component={Login} />
                </Switch>
              )}
              <div id="fixStyle" />
            </div>
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  institutions: validateInstitutions.isRequired,
  selectedInstitution: PropTypes.number.isRequired,
  reduxGetMe: PropTypes.func.isRequired,
  token: PropTypes.string,
  isLoginModalOpen: PropTypes.bool.isRequired,
  isSignUpModalOpen: PropTypes.bool.isRequired,
  reduxInstitutionsSelect: PropTypes.func.isRequired,
  history: validateHistory.isRequired,
  router: validateRouter.isRequired,
  user: validateUser,
  reduxToggleLoginModal: PropTypes.func.isRequired,
  reduxToggleSignUpModal: PropTypes.func.isRequired,
  reduxLogout: PropTypes.func.isRequired,
  authLoading: PropTypes.bool.isRequired,
  reduxSignIn: PropTypes.func.isRequired,
  authErrors: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.exact({
      error: PropTypes.string
    })
  ]).isRequired
};

App.defaultProps = {
  user: null,
  token: null
};

const mapStateToProps = state => ({
  token: state.auth.token,
  burgerMenu: state.burgerMenu,
  isLoginModalOpen: state.aside.isLoginModalOpen,
  isSignUpModalOpen: state.aside.isSignUpModalOpen,
  user: state.auth.user,
  router: state.router,
  authLoading: state.auth.loading,
  authErrors: state.auth.errors,
  institutions: state.institutions.institutions,
  selectedInstitution: state.institutions.selectedInstitution
});

export default connect(
  mapStateToProps,
  {
    reduxGetMe: getMe,
    reduxToggleSidebar: toggleSidebar,
    reduxLogout: logout,
    reduxToggleLoginModal: toggleLoginModal,
    reduxToggleSignUpModal: toggleSignUpModal,
    reduxSignIn: signIn,
    reduxInstitutionsSelect: institutionsSelect
  }
)(App);
