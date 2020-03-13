import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import { reducer as burgerMenuReducer } from 'redux-burger-menu';
import AuthReducer from './AuthReducer';
import SignUpReducer from './SignUpReducer';
import UserReducer from './UserReducer';
// import LocaleReducer from './LocaleReducer';
// import SidebarReducer from './SidebarReducer';
// ALLREMU
import ProfileReducer from './ProfileReducer';
import AsideRecuder from './AsideReducer';
// Nuevos ↓
import GroupsReducer from './GroupsReducer';
import InstitutionsReducer from './InstitutionsReducer';
import AttendeesReducer from './AttendeesReducer';
import TopicsReducer from './TopicsReducer';
import EvaluacionesReducer from './EvaluationsReducer';
import RepositoriesReducer from './RepositoriesReducer';
import QuestionsReducer from './QuestionsReducer';
import ObjectivesReducer from './ObjectivesReducer';
import AsignationsReducer from './AsignationsReducer';

const rootReducer = history =>
  combineReducers({
    auth: AuthReducer,
    signup: SignUpReducer,
    user: UserReducer,
    profile: ProfileReducer,
    aside: AsideRecuder,
    groups: GroupsReducer,
    attendees: AttendeesReducer,
    topics: TopicsReducer,
    evaluations: EvaluacionesReducer,
    repositories: RepositoriesReducer,
    institutions: InstitutionsReducer,
    questions: QuestionsReducer,
    objectives: ObjectivesReducer,
    asignations: AsignationsReducer,
    router: connectRouter(history)
  });

export default rootReducer;
