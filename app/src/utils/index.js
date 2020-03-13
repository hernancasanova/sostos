import _ from 'lodash';

export const getErrors = errors => {
  console.log('utils ERROR');
  console.log(errors);
  const newError = _.map(errors, e => ({
    field: e.field.length > 2 ? e.field.join('_') : e.field[0],
    message: e.messages[0],
    type: e.types[0]
  }));
  return _.keyBy(newError, 'field');
};

export default getErrors;
