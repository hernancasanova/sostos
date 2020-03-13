import React from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

const override = css`
  display: block;
  margin: auto;
  border-color: red;
`;

const CargadorHermoso = props => {
  const { puro, cargando, lista } = props;
  return (
    <React.Fragment>
      <div
        style={{ opacity: `${!cargando || lista.length > 0 ? '1' : '0'}` }}
        className={`${puro ? `` : `col-12 p-0 m-0 contenedor-enterprise-list-prueba`}`}
      >
        {cargando === false && lista}
      </div>

      <div className="row row-pacman">
        <div className="col-12">
          <div className="contenedor-pacman">
            <BarLoader
              css={override}
              sizeUnit="px"
              color="#1F72AB"
              width={500}
              height={10}
              loading={cargando /*  && lista.length === 0 */}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

CargadorHermoso.defaultProps = {
  puro: false
};

CargadorHermoso.propTypes = {
  cargando: PropTypes.bool.isRequired,
  lista: PropTypes.arrayOf(PropTypes.node).isRequired,
  puro: PropTypes.bool
};

export default CargadorHermoso;
