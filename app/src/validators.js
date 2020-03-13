import PropTypes from 'prop-types';
// #region Location
const validateLocation = PropTypes.shape({
  pathname: PropTypes.string
});
// #endregion
// #region History
const validateHistory = PropTypes.shape({
  action: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
});
// #endregion
// #region Campos
const validateField = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  validation: PropTypes.func
});
const validateFields = PropTypes.arrayOf(validateField);
// #endregion
// #region Grupo - Grupos
const validateGroup = PropTypes.exact({
  id: PropTypes.number,
  name: PropTypes.string,
  attendees: PropTypes.arrayOf(PropTypes.number),
  observation: PropTypes.string,
  institution: PropTypes.number
});
const validateGroups = PropTypes.arrayOf(validateGroup);
// #endregion
// #region Attendee - Attendees
const validateAttendee = PropTypes.shape({
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  evaluations: PropTypes.number,
  enrollment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rut: PropTypes.string
});

const validateAttendees = PropTypes.arrayOf(validateAttendee);
// #endregion
// #region Subtopic - Subtopics
const validateSubtopic = PropTypes.exact({
  id: PropTypes.number,
  name: PropTypes.string,
  objectives: PropTypes.arrayOf(PropTypes.number)
});
const validateSubtopics = PropTypes.arrayOf(validateSubtopic);
//  #endregion
// #region Topic - Topics
const validateTopic = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  subtopics: validateSubtopics,
  expectedLearning: PropTypes.string
});
const validateTopics = PropTypes.arrayOf(validateTopic);
// #endregion
// #region Objective - Objectives
const validateObjective = PropTypes.exact({
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  requirements: PropTypes.string,
  keyWords: PropTypes.string,
  concepts: PropTypes.string,
  repositories: PropTypes.arrayOf(PropTypes.number)
});
const validateObjectives = PropTypes.arrayOf(validateObjective);
// #endregion
// #region Alternative Alternatives
const validateAlternative = PropTypes.shape({
  correct: PropTypes.bool,
  text: PropTypes.string,
  id: PropTypes.number,
  alignment: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
});
const validateAlternatives = PropTypes.arrayOf(validateAlternative);
// #endregion
// #region Question - Questions
const validateQuestion = PropTypes.shape({
  code: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  alternatives: validateAlternatives,
  difficulty: PropTypes.oneOf([-1, 0, 1]),
  topic: PropTypes.number,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  subtopic: PropTypes.number
});
const validateQuestions = PropTypes.arrayOf(validateQuestion);
// #endregion
// #region Evaluation - Evaluations
const validateEvaluation = PropTypes.shape({
  name: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.number),
  topics: PropTypes.string
});
const validateEvaluations = PropTypes.arrayOf(validateEvaluation);
// #endregion
// #region Columna - Columnas
const validateColumn = PropTypes.exact({
  label: PropTypes.string,
  value: PropTypes.string
});

const validateColumns = PropTypes.arrayOf(validateColumn);
// #endregion
// #region Repository - Repositories
const valdiateRepository = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  files: PropTypes.number.isRequired,
  color: PropTypes.string
});

const validateRepositories = PropTypes.arrayOf(valdiateRepository);
// #endregion
// #region Institución - Instituciones
const validateInstitution = PropTypes.shape({
  // ↑ Después dejar como exact
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  postal: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
});

const validateInstitutions = PropTypes.arrayOf(validateInstitution);
// #endregion
// #region User
const validateUser = PropTypes.exact({
  rut: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string
});
// #endregion
// #region Match with and withouts params
const validateMatch = PropTypes.exact({
  isExact: PropTypes.bool,
  params: PropTypes.oneOfType([
    PropTypes.exact({
      id: PropTypes.string
    }),
    PropTypes.shape({})
  ]),
  path: PropTypes.string,
  url: PropTypes.string
});
// #endregion
// #region Router
const validateRouter = PropTypes.exact({
  action: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired
  })
});
// #endregion
// #region Exports
export {
  validateGroup,
  validateGroups,
  validateHistory,
  validateUser,
  validateLocation,
  validateRouter,
  validateFields,
  validateColumns,
  validateInstitutions,
  validateInstitution,
  validateMatch,
  validateAttendees,
  validateAttendee,
  valdiateRepository,
  validateRepositories,
  validateTopic,
  validateTopics,
  validateEvaluation,
  validateEvaluations,
  validateAlternative,
  validateAlternatives,
  validateQuestion,
  validateQuestions,
  validateObjective,
  validateObjectives,
  validateSubtopic,
  validateSubtopics
};
// #endregion
