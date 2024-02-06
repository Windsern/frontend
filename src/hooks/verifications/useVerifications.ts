import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/verifications/verificationsSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useVerifications() {
	const status = useSelector(state => state.verifications.status)
	const date_start = useSelector(state => state.verifications.date_start)
	const date_end = useSelector(state => state.verifications.date_end)
	const user = useSelector(state => state.verifications.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchVerifications = async () => {

		const {data} = await api.get(`verifications/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		return data.filter(verification => verification.owner.name.includes(user))

	}

	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchVerifications,
		setDateStart,
		setDateEnd,
		setUser
	};
}