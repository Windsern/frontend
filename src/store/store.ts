import {configureStore} from "@reduxjs/toolkit";

import buildingReducer from "./buildings/buildingSlice"
import draftVerificationReducer from "./verifications/verificationSlice"
import authReducer from "./users/authSlice"
import verificationsReducer from "./verifications/verificationsSlice"
import buildingsReducer  from "./buildings/buildingsSlice"

export default configureStore({
	reducer: {
		building: buildingReducer,
		buildings: buildingsReducer,
		verification: draftVerificationReducer,
		verifications: verificationsReducer,
		user: authReducer
	}
});