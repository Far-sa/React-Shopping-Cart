import { combineReducers } from 'redux'

import usersReducer from './users'

export default combineReducers({
  Users: usersReducer
})
