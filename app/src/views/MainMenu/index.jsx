import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainMenuLink from '../../components/MainMenuLink';
import IconParameters from '../../assets/img/MainMenu/parameters.png';
import IconEnterprises from '../../assets/img/MainMenu/enterprises.png';
import IconEmployees from '../../assets/img/MainMenu/employees.png';
import IconPaymentsDiscounts from '../../assets/img/MainMenu/payments_discounts.png';
import IconPrevired from '../../assets/img/MainMenu/previred.png';
import './style.css';
import { validateHistory } from '../../validators';

class MainMenu extends Component {
  render() {
    const { loading, history } = this.props;
    if (loading) return 'Loading...';
    return (
      <div>
        <h3 className="MainMenuTitle">Menu Principal</h3>
        <div className="MainMenuViewContainer">
          <div className="MainMenuViewLinkContainer">
            <MainMenuLink
              img={IconParameters}
              name="Parámetros"
              url="/parameters"
              history={history}
            />
            <MainMenuLink
              img={IconEnterprises}
              name="Empresas"
              url="/enterprises"
              history={history}
            />
            <MainMenuLink img={IconEmployees} name="Empleados" url="/employees" history={history} />
            <MainMenuLink
              img={IconPaymentsDiscounts}
              name="Haberes / Descuentos"
              url="/payment-discount"
              history={history}
            />
            <MainMenuLink img={IconPrevired} name="Previred" url="/previred" history={history} />
          </div>
        </div>
      </div>
    );
  }
}

MainMenu.propTypes = {
  loading: PropTypes.bool.isRequired,
  history: validateHistory.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(
  mapStateToProps,
  {}
)(MainMenu);
