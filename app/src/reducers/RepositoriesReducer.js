import { REPOSITORIES_ADD, REPOSITORIES_DELETE } from '../actiontypes/repositories';

const INITIAL_STATE = [
  {
    id: 1,
    name: 'Mi Primer Repositorio',
    description: 'Repositorio de Prueba',
    files: 15,
    colour: '#4dcabd'
  },
  {
    id: 2,
    name: '2018',
    description: 'Archivos antiguos',
    files: 45
  },
  {
    id: 3,
    name: '2017',
    description: 'Archivos antiguos',
    files: 22,
    colour: '#f26985'
  }
];

export default (state = INITIAL_STATE, action) => {
  const { type, repository, repositories } = action;
  switch (type) {
    case REPOSITORIES_ADD:
      repository.files = 0;
      repository.id = state.length + 1;
      state.push(repository);
      return state;
    case REPOSITORIES_DELETE:
      return state.filter(repositoryS => repositories.indexOf(repositoryS.id) === -1);
    default:
      return state;
  }
};
