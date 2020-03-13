import {
  GROUPS_ADD,
  GROUPS_DELETE,
  GROUPS_UNBIND_ATTENDEES,
  GROUPS_BIND_ATTENDEES,
  GROUPS_EDIT,
  GROUPS_ADD_FROM_XLXS
} from '../actiontypes/groups';
import { ATTENDEES_ADD } from '../actiontypes/attendees';
import Firebase from '../db';

const { db } = new Firebase();
db.ref('asistentes').on('value', snapshot => {
  console.log('Le Snap');
  console.log(snapshot.val());
});

const INITIAL_STATE = [
  {
    id: 0,
    name: 'Rodemco',
    observation: 'Commodo do in tempor mollit sit enim veniam occaecat excepteur anim do.',
    institution: 2,
    attendees: [22, 59, 76, 79]
  },
  {
    id: 1,
    name: 'Sunclipse',
    observation: 'Labore ad in aliquip consequat amet sunt aliquip fugiat laboris sunt est.',
    institution: 1,
    attendees: [7, 14, 18, 30, 33, 48, 49, 87, 89, 91]
  },
  {
    id: 2,
    name: 'Kidgrease',
    observation: 'Aliqua ipsum minim sunt ullamco labore sint fugiat.',
    institution: 7,
    attendees: [11, 15, 46, 47]
  },
  {
    id: 3,
    name: 'Halap',
    observation: 'Aute adipisicing veniam labore ipsum ullamco tempor quis.',
    institution: 5,
    attendees: [8, 32, 62, 67]
  },
  {
    id: 4,
    name: 'Comvoy',
    observation:
      'Nisi laboris nisi enim ullamco voluptate anim labore sit sunt deserunt et exercitation irure incididunt.',
    institution: 6,
    attendees: [6, 10, 19, 35, 40, 44, 51, 53, 60, 66, 73, 74]
  },
  {
    id: 5,
    name: 'Nebulean',
    observation:
      'Ut quis fugiat irure eu cupidatat Lorem ipsum reprehenderit ea ad pariatur magna sint.',
    institution: 5,
    attendees: [83, 84, 98, 99]
  },
  {
    id: 6,
    name: 'Songbird',
    observation: 'Nisi incididunt ex reprehenderit aliqua cupidatat anim aute Lorem labore quis.',
    institution: 8,
    attendees: [5, 17]
  },
  {
    id: 7,
    name: 'Magneato',
    observation:
      'Ea adipisicing dolor nisi excepteur nostrud nisi adipisicing sunt officia ad laborum Lorem sunt voluptate.',
    institution: 9,
    attendees: [1, 3, 9]
  },
  {
    id: 8,
    name: 'Acrodance',
    observation: 'Exercitation velit excepteur nisi fugiat tempor minim enim.',
    institution: 9,
    attendees: [86, 92, 95]
  },
  {
    id: 9,
    name: 'Hyplex',
    observation: 'Proident deserunt do nisi proident cupidatat eu est reprehenderit ea.',
    institution: 7,
    attendees: [65, 72, 77, 100]
  },
  {
    id: 10,
    name: 'Viocular',
    observation: 'Reprehenderit enim eiusmod aliqua aliqua fugiat.',
    institution: 2,
    attendees: [26, 59, 76, 79]
  }
];

export default (state = INITIAL_STATE, action) => {
  const { group, type, groups, attendees, selectedInstitution } = action;
  const stateItem =
    typeof group === 'undefined'
      ? false
      : state.find(singleStateItem => singleStateItem.id === group.id);
  switch (type) {
    case GROUPS_ADD:
      group.attendees = [];
      group.institution = selectedInstitution;
      group.id = state.length + 1;
      state.push(group);
      return state;
    case GROUPS_DELETE:
      return state.filter(groupS => groups.indexOf(groupS.id) === -1);
    case GROUPS_UNBIND_ATTENDEES:
      group.attendees = group.attendees.filter(itemList => attendees.indexOf(itemList) === -1);
      return state;
    case GROUPS_BIND_ATTENDEES:
      group.attendees = group.attendees.concat(attendees);
      return state;
    case GROUPS_EDIT:
      Object.keys(group).forEach(propName => {
        stateItem[propName] = group[propName];
      });
      return state;
    case GROUPS_ADD_FROM_XLXS:
      // return [...state, groups];
      return state.concat(groups);
    case ATTENDEES_ADD:
      return state;
    default:
      return state;
  }
};
