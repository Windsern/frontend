import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	verification: undefined,
	verification_id: undefined
};

const verificationSlice = createSlice({
	name: 'verification',
	initialState: initialState,
	reducers: {
		updateVerification(state, action) {
			state.verification = action.payload
		},
		updateVerificationId(state, action) {
			state.verification_id = action.payload
		}
	}
})

export const {
	updateVerification,
	updateVerificationId
} = verificationSlice.actions;

export default verificationSlice.reducer;