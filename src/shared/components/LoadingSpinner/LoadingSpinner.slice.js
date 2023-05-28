const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  shouldDisplay: false,
}

const LoadingSpinnerSlice = createSlice({
  initialState,
  name: 'loadingSpinner',
  reducers: {
    toggleLoadingSpinner: (state, {payload}) => {
      state.shouldDisplay = payload;
    }
  }
})

export const loadingSpinnerActions = LoadingSpinnerSlice.actions;

export const loadingSpinnerReducer = LoadingSpinnerSlice.reducer;
