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
		},
		updateName(state, action) {
			state.building.name = action.payload
		},
		updateDescription(state, action) {
			state.building.description = action.payload
		},
		updateFloors(state, action) {
			state.building.floors = action.payload
		},
		updateYear(state, action) {
			state.building.year = action.payload
		},
		updateImage(state, action) {
			state.building.image = action.payload
		}
	}
})

export const {
	updateBuilding,
	updateName,
	updateDescription,
	updateFloors,
	updateYear,
	updateImage
} = buildingSlice.actions;

export default buildingSlice.reducer;