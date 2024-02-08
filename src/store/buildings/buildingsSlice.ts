import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	buildings: [],
	query: ""
};

const buildingsSlice = createSlice({
	name: 'buildings',
	initialState: initialState,
	reducers: {
		updateBuildings(state, action) {
			state.buildings = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateBuildings,
	updateQuery
} = buildingsSlice.actions;

export default buildingsSlice.reducer;