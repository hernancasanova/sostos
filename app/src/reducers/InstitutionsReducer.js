import {
  INSTITUTIONS_DELETE,
  INSTITUTIONS_SELECT,
  INSTITUTIONS_ADD,
  INSTITUTIONS_EDIT
} from '../actiontypes/institutions';

const INITIAL_STATE = {
  selectedInstitution: 1,
  institutions: [
    {
      id: 1,
      name: 'Marvane',
      description: 'Nostrud excepteur eiusmod excepteur excepteur occaecat.',
      country: 'Albania',
      city: 'Stevens',
      postal: 41100
    },
    {
      id: 2,
      name: 'Syntac',
      description:
        'Elit deserunt commodo exercitation ex ullamco eu quis elit fugiat quis laboris.',
      country: 'Bahrain',
      city: 'Onton',
      postal: 22621
    },
    {
      id: 3,
      name: 'Collaire',
      description: 'Qui eu Lorem cupidatat mollit esse sit esse nostrud eu.',
      country: 'Jordan',
      city: 'Bethany',
      postal: 81210
    },
    {
      id: 4,
      name: 'Architax',
      description: 'Labore mollit proident fugiat nulla.',
      country: 'Mauritania',
      city: 'Craig',
      postal: 28041
    },
    {
      id: 5,
      name: 'Macronaut',
      description:
        'Reprehenderit enim aute minim est veniam sit officia est amet aute eiusmod ullamco.',
      country: 'France, Metropolitan',
      city: 'Hartsville/Hartley',
      postal: 10083
    },
    {
      id: 6,
      name: 'Neocent',
      description: 'Do sit exercitation fugiat quis mollit sit consectetur.',
      country: 'French Southern Territories',
      city: 'Waterview',
      postal: 87922
    },
    {
      id: 7,
      name: 'Insurity',
      description:
        'Incididunt tempor sit magna dolore incididunt occaecat quis eu ullamco dolor aliquip cillum reprehenderit laborum.',
      country: 'Spain',
      city: 'Hiseville',
      postal: 70608
    },
    {
      id: 8,
      name: 'Brainclip',
      description: 'Cillum quis adipisicing dolor culpa nisi nisi ex non laboris.',
      country: 'Tajikistan',
      city: 'Boomer',
      postal: 76260
    },
    {
      id: 9,
      name: 'Maineland',
      description: 'Amet aliqua aliquip aliquip ad dolor reprehenderit fugiat.',
      country: 'El Salvador',
      city: 'Columbus',
      postal: 85504
    },
    {
      id: 10,
      name: 'Gology',
      description:
        'Qui eiusmod fugiat labore sit exercitation veniam minim aliqua proident dolore ad reprehenderit.',
      country: 'Estonia',
      city: 'Galesville',
      postal: 87371
    }
  ]
};

export default (state = INITIAL_STATE, action) => {
  const { institution, selectedInstitution, list, type } = action;
  const stateItem =
    typeof institution === 'undefined'
      ? false
      : state.institutions.find(singleStateItem => singleStateItem.id === institution.id);

  switch (type) {
    case INSTITUTIONS_ADD:
      institution.id = state.institutions.length + 1;
      state.institutions.push(institution);
      return state;
    case INSTITUTIONS_DELETE:
      return {
        ...state,
        institutions: state.institutions.filter(institutionS => {
          return list.indexOf(institutionS.id) === -1;
        })
      };
    case INSTITUTIONS_SELECT:
      return {
        ...state,
        selectedInstitution
      };
    case INSTITUTIONS_EDIT:
      Object.keys(institution).forEach(propName => {
        stateItem[propName] = institution[propName];
      });
      return state;
    default:
      return state;
  }
};
