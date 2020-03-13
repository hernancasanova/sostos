/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable prefer-spread */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import readXlsxFile from 'read-excel-file';
import { validateGroups, validateAttendees, validateHistory } from '../../../validators';
import GoBack from '../../../components/GoBack';
import AttendeeRow from './attendeeRow';
import NewButton from '../../../components/Buttons/NewButton';
import GenericModal from '../../../components/Common/GenericModal';
import AttendeeHeader from './attendeeHeader';
import PATHS from '../../../paths';

const HEADERS = [
  { label: 'Nombre', value: 'firstName', sortable: true },
  { label: 'Apellido', value: 'lastName', sortable: true },
  { label: 'Email', value: 'email', sortable: true },
  { label: 'Matrícula', value: 'enrollment', sortable: true },
  { label: 'Rut', value: 'rut', sortable: true },
  { label: 'Curso', value: 'course' },
  { label: 'Asignatura', value: 'subjet' },
  { label: 'Año', value: 'year' }
];

class Load extends Component {
  static capitalizeFistLetter(word) {
    const wordArray = [];
    for (let i = 0; i < word.length; i += 1) {
      const letraMinuscula = i ? word[i].toLowerCase() : word[i].toUpperCase();
      wordArray.push(letraMinuscula);
    }
    return wordArray.join('');
  }

  static fixWords(words) {
    const splittedWords = words.split(' ');
    for (let i = 0; i < splittedWords.length; i += 1) {
      splittedWords[i] = Load.capitalizeFistLetter(splittedWords[i]);
    }
    return splittedWords.join(' ');
  }

  constructor(props) {
    super(props);
    this.refInput = React.createRef();
    this.readXlxs = this.readXlxs.bind(this);
    this.removeAttendee = this.removeAttendee.bind(this);
    this.loadAttendees = this.loadAttendees.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.clickHeader = this.clickHeader.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.state = {
      attendees: [],
      fileName: 'Seleccione un archivo',
      first: 0,
      elements: 5,
      modal: false,
      added: 0,
      ascendent: true,
      sortBy: 'firstName'
    };
  }

  sortByName(a, b) {
    const { ascendent, sortBy } = this.state;
    if (a[sortBy] > b[sortBy]) {
      return ascendent ? 1 : -1;
    }
    if (a[sortBy] < b[sortBy]) {
      return ascendent ? -1 : 1;
    }
    return 0;
  }

  removeAttendee(idAttendee) {
    const { attendees } = this.state;
    this.setState({
      attendees: attendees.filter(attendee => attendee.id !== idAttendee)
    });
  }

  loadAttendees() {
    const { attendees } = this.state;
    const { attendeesAddFromXlxs, attendees: attendeesProps } = this.props;
    const attendeesPropsRut = attendeesProps.map(attendeeProps => attendeeProps.rut);
    const attendeesToAdd = attendees.filter(
      attendeeFilter => attendeesPropsRut.indexOf(attendeeFilter.rut) === -1
    );
    attendeesAddFromXlxs(attendeesToAdd);
    this.setState({
      modal: true,
      attendees: [],
      added: attendeesToAdd.length,
      fileName: 'Seleccione un archivo'
    });
  }

  readXlxs() {
    const { groups, attendees, selectedInstitution } = this.props;
    let idGroups = Math.max.apply(Math, groups.map(group => parseInt(group.id, 10)));
    let idAttendees = Math.max.apply(Math, attendees.map(attendee => parseInt(attendee.id, 10)));
    if (this.refInput.current.files) {
      const file = this.refInput.current.files[0];
      readXlsxFile(file).then(rows => {
        const attendeesFile = [];
        const groupsFile = [];
        const groupsNameHelper = [];
        if (rows.length > 0) {
          rows.forEach((row, index) => {
            if (index) {
              attendeesFile.push({
                id: (idAttendees += 1),
                firstName: Load.fixWords(row[1]),
                lastName: Load.fixWords(row[2]),
                email: row[3],
                enrollment: row[4],
                rut: row[5],
                institution: selectedInstitution,
                course: Load.fixWords(row[6]),
                subject: Load.fixWords(row[7]),
                year: row[8]
              });
              const groupName = `${row[6]} ${row[7]} ${row[8]}`;
              if (groupsNameHelper.indexOf(groupName) === -1) {
                groupsNameHelper.push(groupName);
                groupsFile.push({
                  id: (idGroups += 1),
                  name: groupName,
                  attendees: [],
                  institution: selectedInstitution
                });
              }
              groupsFile.find(group => group.name === groupName).attendees.push(idAttendees);
            }
          });
        }
        this.setState({
          attendees: attendeesFile,
          fileName: file.name,
          added: 0
        });
      });
    }
  }

  handleChangeSelect(e) {
    this.setState({
      elements: parseInt(e.target.value, 10),
      first: 0
    });
  }

  clickHeader(sortBy) {
    const { ascendent } = this.state;
    this.setState({
      ascendent: !ascendent,
      sortBy
    });
  }

  handleCloseModal() {
    const { history } = this.props;
    this.setState({ modal: false });
    history.push(PATHS.ATTENDEES);
  }

  render() {
    const { history, attendees: attendeesProps } = this.props;
    const { fileName, attendees, first, elements, modal, added, ascendent, sortBy } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <GoBack history={history} />
          </Col>
        </Row>
        <Row>
          <Col style={{ paddingBottom: '16px' }} xl="4">
            <div className="custom-file">
              <label id="input-file-label" className="custom-file-label" htmlFor="input-file">
                {fileName}
              </label>
              <input
                className="custom-file-input"
                accept=".xlsx"
                ref={this.refInput}
                onChange={this.readXlxs}
                type="file"
                id="input-file"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="float-left">Asistentes</h3>
            <NewButton
              disabled={attendees.length === 0}
              className="float-right"
              onClick={this.loadAttendees}
              text="Cargar Datos"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table className="sosto-table">
              <thead>
                <tr className="noselect">
                  {HEADERS.map(HEADER => (
                    <AttendeeHeader
                      key={HEADER.label}
                      ascendent={ascendent}
                      sortBy={sortBy}
                      clickHeader={this.clickHeader}
                      header={HEADER}
                    />
                  ))}
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {attendees
                  .sort(this.sortByName)
                  .slice(first, first + elements)
                  .map(attendee => (
                    <AttendeeRow
                      repeated={
                        typeof attendeesProps.find(
                          attendeeFind => attendeeFind.rut === attendee.rut
                        ) !== 'undefined'
                      }
                      removeAttendee={this.removeAttendee}
                      key={attendee.id}
                      attendee={attendee}
                    />
                  ))}
              </tbody>
            </Table>
            <Row>
              <Col>
                <NewButton
                  className="attendees-load-prev float-left noselect"
                  disabled={first === 0}
                  onClick={() =>
                    this.setState({
                      first: first - elements
                    })
                  }
                  type="button"
                  text="←"
                />
                <NewButton
                  className="attendees-load-next float-left noselect"
                  disabled={first + elements >= attendees.length}
                  onClick={() =>
                    this.setState({
                      first: first + elements
                    })
                  }
                  type="button"
                  text="→"
                />
                {attendees.length > 0 &&
                  `Mostrando del asistente ${first + 1} al ${
                    first + elements > attendees.length ? attendees.length : first + elements
                  } de un total de ${attendees.length}`}

                <Form.Control
                  value={elements}
                  onChange={this.handleChangeSelect}
                  className="float-right attendees-load-select"
                  as="select"
                >
                  <option>5</option>
                  <option>10</option>
                </Form.Control>
              </Col>
            </Row>
          </Col>
        </Row>
        <GenericModal
          handleClose={this.handleCloseModal}
          modal={modal}
          message={`${added} asistentes cargados exitosamente`}
        />
      </Container>
    );
  }
}

Load.propTypes = {
  groups: validateGroups.isRequired,
  attendees: validateAttendees.isRequired,
  attendeesAddFromXlxs: PropTypes.func.isRequired,
  selectedInstitution: PropTypes.number.isRequired,
  history: validateHistory.isRequired
};

export default Load;
