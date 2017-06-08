import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux';

const users = (state=[], action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.users;
    default:
      return state;
  }
};

const profile = (state={}, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return action.profile;
    case 'RESET_PROFILE':
      return null;
    default:
      return state;
  }
};

const posts = (state=[], action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return action.posts;
    default:
      return state;
  }
};

const reducers = combineReducers({
  users,
  profile,
  posts,
  intl: intlReducer,
});

export default reducers;
