import { combineReducers } from 'redux';
import profileSlice from './slices/profileSlice';
import vehicleSlice from './slices/vehicleSlice';

const rootReducer = combineReducers({
  storeUserData: profileSlice,
  storeVehicleData: vehicleSlice
})

export default rootReducer