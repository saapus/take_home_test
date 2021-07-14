import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

export const ActionTypes = {
  ADD_ENTRY: "ADD_ENTRY",
  INIT_ENTRIES: "INIT_ENTRIES",
  FILTER_ENTRIES: "FILTER_ENTRIES",
};

function taxReducer(state = {}, action) {
  const { ADD_ENTRY, INIT_ENTRIES, FILTER_ENTRIES } = ActionTypes;
  switch (action.type) {
    case ADD_ENTRY: {
			const entries = [...state.entries, action.payload];
      return {
        entries,
        filtered: entries,
      };
    }
    case INIT_ENTRIES: {
			const entries = action.payload;
      return {
        entries,
        filtered: entries
      };
    }
    case FILTER_ENTRIES: {
			const filters = action.payload;
			if (!filters || !Object.keys(filters).length) return state;
			const { zipCode, city, state: stateFilter } = filters;
			const { entries } = state;
			const filtered = entries.filter((i) => {
				if (!(zipCode || city || stateFilter)) return true;
				let flag = 0;
				if (zipCode) flag += i.zip_code.startsWith(zipCode);
				if (city) flag += i.city.startsWith(city);
				if (stateFilter) flag += i.state.startsWith(stateFilter);
				return flag === Object.keys(filters).map(i => filters[i]).filter(Boolean).length;
      });
			return {
				...state,
				entries,
				filtered
			};
    }
    default:
      return state;
  }
}

function initData() {
	return (dispatch) => {
		(async () => {
			const data = await fetch("https://api-prod.workhorsescs.pro/api/taxes").then(r => r.json()); 
			dispatch({
				type: ActionTypes.INIT_ENTRIES,
        payload: data.data.slice(0, 100),
      });
		})();
	};
}

const store = createStore(
  taxReducer,
  { entries: [], filtered: [] },
  applyMiddleware(reduxThunk)
);

store.dispatch(initData());

export default store;
