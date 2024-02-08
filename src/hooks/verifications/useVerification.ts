import {useDispatch, useSelector} from 'react-redux';
import {
	updateVerification,
	updateVerificationId
} from "../../store/verifications/verificationSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom"

export function useVerification() {

	const {access_token} = useToken()

	const verification = useSelector(state => state.verification.verification)
	const verification_id = useSelector(state => state.verification.verification_id)

	const navigate = useNavigate()

	const is_draft = verification?.status == 1

	const dispatch = useDispatch()

	const setVerification = (value) => {
		dispatch(updateVerification(value))
	}

	const setVerificationId = (value) => {
		dispatch(updateVerificationId(value))
	}

	const sendVerification = async () => {

		const response = await api.put(`verifications/${verification.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setVerification(undefined)
		}
	}

	const deleteVerification = async () => {

		const response = await api.delete(`verifications/${verification.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setVerification(undefined)
		}

	}

	const saveVerification = async () => {

		const form_data = new FormData()

		await api.put(`verifications/${verification.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchVerification = async (verification_id) => {

		const {data} = await api.get(`verifications/${verification_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setVerification(data)
	}

	const addBuildingToVerification = async (building) => {
		await api.post(`buildings/${building.id}/add_to_verification/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteBuildingFromVerification = async (building) => {
		const response = await api.delete(`verifications/${verification.id}/delete_building/${building.id}/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200) {
			await fetchVerification(verification_id)
		} else if (response.status == 201) {
			navigate("/")
		}
	}

	return {
		verification,
		verification_id,
		is_draft,
		setVerification,
		saveVerification,
		sendVerification,
		deleteVerification,
		fetchVerification,
		addBuildingToVerification,
		deleteBuildingFromVerification,
		setVerificationId
	};
}