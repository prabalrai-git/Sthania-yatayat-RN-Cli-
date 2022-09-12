import {combineReducers} from 'redux';
import printOnce from './slices/printOnce';
import profileSlice from './slices/profileSlice';
import vehicleSlice from './slices/vehicleSlice';

const rootReducer = combineReducers({
  storeUserData: profileSlice,
  storeVehicleData: vehicleSlice,
  storePrintOnce: printOnce,
});

export default rootReducer;
