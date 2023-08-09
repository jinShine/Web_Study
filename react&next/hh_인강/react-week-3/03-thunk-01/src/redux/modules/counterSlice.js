import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const __addNumber = createAsyncThunk(
  // 첫번째 인자 : action value
  "addNumber",
  // 두번째 인자 : 콜백함수
  (payload, thunkAPI) => {
    setTimeout(() => {
      thunkAPI.dispatch(addNumber(payload));
    }, 2000);
  }
);

export const __minusNumber = createAsyncThunk(
  "minusNumber",
  (payload, thunkAPI) => {
    setTimeout(() => {
      thunkAPI.dispatch(addNumber(payload));
    }, 2000);
  }
);

const initialState = {
  number: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNumber: (state, action) => {
      state.number = state.number + action.payload;
    },
    minusNumber: (state, action) => {
      state.number = state.number - action.payload;
    },
  },
});

export const { addNumber, minusNumber } = counterSlice.actions;
export default counterSlice.reducer;
