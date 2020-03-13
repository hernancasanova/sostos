import React, { Component } from 'react';
import { Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { validateUser } from '../../../validators';
import './style.css';
import Item from './item';
import PATHS from '../../../paths';
import GroupsSVG from '../../../components/Common/SVG/groups';
import AttendeesSVG from '../../../components/Common/SVG/attendees';
import TopicsSVG from '../../../components/Common/SVG/topics';
import EvaluationsSVG from '../../../components/Common/SVG/evaluations';
import QuestionsSVG from '../../../components/Common/SVG/questions';
import RepositoriesSVG from '../../../components/Common/SVG/repositories';
import InstitutionsSVG from '../../../components/Common/SVG/institutions';
import ProfileSVG from '../../../components/Common/SVG/profile';
import LogoutSVG from '../../../components/Common/SVG/logout';
/* global window */

class Aside extends Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.isActiveBoolean = this.isActiveBoolean.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    const { token, user, reduxGetMe } = this.props;
    if (token && !user) {
      reduxGetMe(token);
    }
    window.addEventListener('resize', this.updateDimensions);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillUnmount() {
    // eslint-disable-next-line no-undef
    window.removeEventListener('resize', this.updateDimensions);
  }

  logout() {
    const { reduxLogout } = this.props;
    reduxLogout();
  }

  /* Determine what route is active actually */
  isActiveBoolean(activePathname) {
    // pathname: url del navegador
    // activePathname: url del menu
    const { pathname } = this.props;
    switch (activePathname) {
      // #region Parameters
      case PATHS.PARAMETERS:
        switch (pathname) {
          case PATHS.PARAMETERS:
            return true;
          default:
            return false;
        }
      // #endregion
      // #region Groups
      case PATHS.GROUPS:
        switch (pathname) {
          case PATHS.GROUPS:
          case PATHS.GROUPS_ADD:
            return true;
          default:
            return pathname.startsWith(PATHS.GROUPS_PRE_SINGLE);
        }
      // #endregion
      // #region Asistentes
      case PATHS.ATTENDEES:
        switch (pathname) {
          case PATHS.ATTENDEES:
          case PATHS.ATTENDEES_ADD:
            return true;
          default:
            return pathname.startsWith(PATHS.ATTENDEES_PRE_SINGLE);
        }
      // #endregion
      // #region Temas
      case PATHS.TOPICS:
        switch (pathname) {
          case PATHS.TOPICS:
          case PATHS.TOPICS_ADD:
            return true;
          default:
            return pathname.startsWith(PATHS.TOPICS_PRE_SINGLE);
        }
      // #endregion
      // #region Evaluaciones
      case PATHS.EVALUATIONS:
        switch (pathname) {
          case PATHS.EVALUATIONS:
            return true;
          default:
            return pathname.startsWith(PATHS.EVALUATIONS_PRE_SINGLE);
        }
      // #endregion
      // #region Preguntas
      case PATHS.QUESTIONS:
        switch (pathname) {
          case PATHS.QUESTIONS:
          case PATHS.QUESTIONS_ADD:
            return true;
          default:
            return pathname.startsWith(PATHS.QUESTIONS_PRE_SINGLE);
        }
      // #endregion
      // #region Objetives
      case PATHS.OBJECTIVES:
        switch (pathname) {
          case PATHS.OBJECTIVES:
          case PATHS.OBJECTIVES_ADD:
            return true;
          default:
            return pathname.startsWith(PATHS.OBJECTIVES_PRE_SINGLE);
        }
      // #endregion
      // #region Repositorios
      case PATHS.REPOSITORIES:
        switch (pathname) {
          case PATHS.REPOSITORIES:
          case PATHS.FILES:
          case PATHS.REPOSITORIES_CREATE:
            return true;
          default:
            return pathname.startsWith(PATHS.REPOSITORIES_PRE_SINGLE);
        }
      // #endregion
      // #region Instituciones
      case PATHS.INSTITUTIONS:
        switch (pathname) {
          case PATHS.INSTITUTIONS:
          case PATHS.INSTITUTIONS_ADD:
            return true;
          default:
            return pathname.startsWith(PATHS.INSTITUTIONS_PRE_SINGLE);
        }
      // #endregion
      // #region Profile
      case PATHS.PROFILE:
        return PATHS.PROFILE === pathname;
      // #endregion
      // #region Default
      default:
        break;
      // #endregion
    }
    return false;
  }

  /* Add classes by viewport size */
  updateDimensions() {
    const { reduxToggleSidebar } = this.props;
    if (window.innerWidth < 999) {
      reduxToggleSidebar(false);
    } else {
      reduxToggleSidebar(true);
    }
  }

  render() {
    const items = [
      {
        path: PATHS.INSTITUTIONS,
        label: 'Instituciones',
        svg: <InstitutionsSVG active={this.isActiveBoolean(PATHS.INSTITUTIONS)} />
      },
      {
        path: PATHS.GROUPS,
        label: 'Grupos',
        svg: <GroupsSVG active={this.isActiveBoolean(PATHS.GROUPS)} />
      },
      {
        path: PATHS.ATTENDEES,
        label: 'Asistentes',
        svg: <AttendeesSVG active={this.isActiveBoolean(PATHS.ATTENDEES)} />
      },
      {
        path: PATHS.EVALUATIONS,
        label: 'Evaluaciones',
        svg: <EvaluationsSVG active={this.isActiveBoolean(PATHS.EVALUATIONS)} />
      },
      {
        path: PATHS.QUESTIONS,
        label: 'Preguntas',
        svg: <QuestionsSVG active={this.isActiveBoolean(PATHS.QUESTIONS)} />
      },
      {
        path: PATHS.TOPICS,
        label: 'Temas',
        svg: <TopicsSVG active={this.isActiveBoolean(PATHS.TOPICS)} />
      },
      {
        path: PATHS.OBJECTIVES,
        label: 'Objetivos',
        svg: <QuestionsSVG active={this.isActiveBoolean(PATHS.OBJECTIVES)} />
      },
      {
        path: PATHS.REPOSITORIES,
        label: 'Repositorios',
        svg: <RepositoriesSVG active={this.isActiveBoolean(PATHS.REPOSITORIES)} />
      },

      {
        path: PATHS.PROFILE,
        label: 'Mi Perfil',
        svg: <ProfileSVG active={this.isActiveBoolean(PATHS.PROFILE)} />
      },
      {
        path: PATHS.LOGOUT,
        label: 'Cerrar Sesión',
        svg: <LogoutSVG />
      }
    ];

    return (
      <React.Fragment>
        <Col md="3" className="aside_menu maximized">
          <nav className="navbar navbar-expand flex-md-column flex-row align-items-start">
            <div className="collapse navbar-collapse">
              {
                <ul className="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                  {items.map(item => (
                    <Item
                      key={item.label}
                      url={item.path}
                      active={this.isActiveBoolean(item.path)}
                      svg={item.svg}
                      label={item.label}
                    />
                  ))}
                </ul>
              }
            </div>
          </nav>
        </Col>
      </React.Fragment>
    );
  }
}

Aside.propTypes = {
  token: PropTypes.string.isRequired,
  user: validateUser.isRequired,
  pathname: PropTypes.string.isRequired,
  reduxLogout: PropTypes.func.isRequired,
  reduxGetMe: PropTypes.func.isRequired,
  reduxToggleSidebar: PropTypes.func.isRequired
};

export default Aside;
