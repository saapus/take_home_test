import { configureStore, createSlice } from "@reduxjs/toolkit";
import ReduxThunk from "redux-thunk";

export const taxSlice = createSlice({
	name: 'taxes',
	initialState: {
		
	},
	reducers: {
		filter: (state, payload) => {
			state.filter(i => i[payload.label] === payload.value);
		},
		initialize: (state, data) => {
			console.log(data);
			state.data = data;
		}
	}
});

export const { filter, initialize } = taxSlice.actions;

const store = configureStore({
	reducer: {
		filter
	},
	middleware: [ReduxThunk]
});

store
  .dispatch(() => {
    return (dispatch) => {
      fetch("https://api-prod.workhorsescs.pro/api/taxes")
        .then((r) => r.json())
        .then((r) => dispatch({ type: "initialize", payload: r }));
    };
  })
  .then(() => {
    console.log("Initialized");
  });

export default store;