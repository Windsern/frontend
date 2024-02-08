import {useDispatch, useSelector} from 'react-redux';
import {
	updateBuildings,
	updateQuery
} from "../../store/buildings/buildingsSlice";
import {api} from "../../utils/api";
import {useVerification} from "../verifications/useVerification";
import {useToken} from "../users/useToken";

export function useBuildings() {
	const buildings = useSelector(state => state.buildings.buildings);
	const query = useSelector(state => state.buildings.query);

	const {access_token} = useToken()

	const {setVerification, setVerificationId} = useVerification()

	const dispatch = useDispatch()

	const setBuildings = (value) => {
		dispatch(updateBuildings(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchBuildings = async (navigate=null) => {

		const {data} = await api.get(`buildings/search/`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_verification_id = data["draft_verification_id"]
		setVerificationId(draft_verification_id)

		if (!draft_verification_id) {
			setVerification(undefined)
			navigate && navigate("/")
		}

		return data["buildings"]
	}

	const deleteBuilding = async (building_id) => {
		await api.delete(`buildings/${building_id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})
	}


	return {
		buildings,
		setBuildings,
		query,
		setQuery,
		searchBuildings,
		deleteBuilding
	};
}