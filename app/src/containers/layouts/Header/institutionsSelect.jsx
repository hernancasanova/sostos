import React from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Select from '../../../components/form/Select';
import { validateInstitutions } from '../../../validators';

const InstitutionsSelect = props => {
  const {
    institutions,
    institutionsSelect,
    selectedInstitution,
    pathnameIsSelectEnterprise
  } = props;
  const options = institutions.map(enterprise => {
    return { value: parseInt(enterprise.id, 10), label: enterprise.name };
  });

  return (
    <div className="ActiveEnterpriseSelect" style={{ width: '100%' }}>
      {!pathnameIsSelectEnterprise && (
        <Row>
          <Col xs="3">
            <p className="ActiveEnterpriseLabel">Institución</p>
          </Col>
          <Col xs="9">
            <Select
              options={options}
              value={parseInt(selectedInstitution, 10)}
              onChange={e => institutionsSelect(e)}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default InstitutionsSelect;

InstitutionsSelect.propTypes = {
  pathnameIsSelectEnterprise: PropTypes.bool.isRequired,
  institutions: validateInstitutions.isRequired,
  institutionsSelect: PropTypes.func.isRequired,
  selectedInstitution: PropTypes.number.isRequired
};
