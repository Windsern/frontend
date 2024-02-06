import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	building: undefined,
};

const buildingSlice = createSlice({
	name: 'building',
	initialState: initialState,
	reducers: {
		updateBuilding(state, action) {
			state.building = action.payload
		}
	}
})

export const {
	updateBuilding
} = buildingSlice.actions;

export default buildingSlice.reducer;