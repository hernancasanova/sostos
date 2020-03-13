import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { validateColumns } from '../../../validators';

// class ItemsTable extends Component {
const ItemsTable = props => {
  const {
    columns,
    items,
    url,
    onClick,
    selectedInstitution,
    noFilter,
    mainColumn,
    selected
  } = props;
  return (
    <Table responsive className="sosto-table">
      <thead>
        <tr>
          <th className="list-table-checkbox-header-empty" />
          {columns.map(columna => (
            <th key={columna.value}>{columna.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items
          .filter(item => {
            return noFilter || parseInt(item.institution, 10) === parseInt(selectedInstitution, 10);
          })
          .map(dato => (
            <tr key={dato.id}>
              <td align="center">
                <Form.Check
                  readOnly
                  defaultChecked={selected && selected[dato.id]}
                  className="common-table-checkbox sosto-table-checkbox"
                  onChange={e => onClick(dato.id, e)}
                  type="checkbox"
                />
              </td>
              {columns.map(campo => {
                return campo.value === mainColumn ? (
                  <td key={`${dato.id}-${campo.value}`}>
                    {url && (
                      <Link style={{ cursor: 'pointer' }} to={`${url}${dato.id}`}>
                        <div className="list-table-cell-container-main">{dato[campo.value]}</div>
                      </Link>
                    )}
                    {!url && (
                      <div className="list-table-cell-container-main">{dato[campo.value]}</div>
                    )}
                  </td>
                ) : (
                  <td key={`${dato.id}-${campo.value}`}>
                    <div className="list-table-cell-container">
                      {typeof dato[campo.value] === 'object'
                        ? dato[campo.value].length
                        : dato[campo.value]}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

ItemsTable.defaultProps = {
  noFilter: false,
  mainColumn: 'name',
  url: false,
  selectedInstitution: false
};

ItemsTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  columns: validateColumns.isRequired,
  url: PropTypes.oneOfType(PropTypes.string, PropTypes.bool),
  onClick: PropTypes.func.isRequired,
  selectedInstitution: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  noFilter: PropTypes.bool,
  mainColumn: PropTypes.string,
  selected: PropTypes.objectOf(PropTypes.bool).isRequired
};

export default ItemsTable;
