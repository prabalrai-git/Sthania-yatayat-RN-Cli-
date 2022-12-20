import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vehicleData: undefined,
  vehicleRoute: undefined,
};

const vehicle = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    storeVehicleData: (state, action) => {
      // console.log("action", action)
      state.vehicleData = action.payload;
    },
    storeVehicleRoute: (state, action) => {
      state.vehicleRoute = action.payload;
    },
  },
});

export const { storeVehicleData, storeVehicleRoute } = vehicle.actions;

export default vehicle.reducer;
