import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  printOnce: false,
};

const printOnce = createSlice({
  name: 'printOnce',
  initialState,
  reducers: {
    storeprintOnceData: (state, action) => {
      // console.log('action', action.payload);
      // console.log(state, action);
      state.printOnce = action.payload;
    },
  },
});

export const {storeprintOnceData} = printOnce.actions;

export default printOnce.reducer;
