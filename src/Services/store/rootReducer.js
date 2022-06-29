import { combineReducers } from 'redux';
import profileSlice from './slices/profileSlice';

const rootReducer = combineReducers({
  storeUserData: profileSlice,
})

export default rootReducer