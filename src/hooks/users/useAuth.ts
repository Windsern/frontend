import {useDispatch, useSelector} from 'react-redux';
import {updateUser, cleanUser} from "../../store/users/authSlice";
import {useToken} from "./useToken";
import {api} from "../../utils/api";

export function useAuth() {
	const {is_authenticated, is_moderator, user_id, user_name, user_email} = useSelector(state => state.user)

	const { access_token, setAccessToken, resetAccessToken } = useToken()

	const dispatch = useDispatch()

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const resetUser = () => {
		dispatch(cleanUser())
	}

	const logOut = async () => {

		const response = await api.post(`logout/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			resetAccessToken()
			resetUser()
		}

	}


	const register = async (formData) => {

		try {

			const response = await api.post(`register/`, formData as FormData)

			if (response.status == 201) {
				setAccessToken(response.data["access_token"])
				return true
			}

		} catch (error) {

			return false
		}
	}


	const login = async (formData) => {

		try {
			const response = await api.post(`login/`, formData)

			setAccessToken(response.data['access_token'])

			const permissions = {
				is_authenticated: true,
				is_moderator: response.data["is_moderator"],
				user_id: response.data["user_id"],
				user_name: response.data["name"],
				user_email: response.data["email"]
			}

			setUser(permissions)

			return true

		} catch (error){

		}
	}


	const auth = async () => {

		if (is_authenticated)
		{
			return true
		}

		if (access_token === "undefined") {
			return false
		}

		try {

			const response = await api.post(`check/`, {}, {
				headers: {
					'authorization': access_token
				}
			})

			if (response.status == 200)
			{
				const permissions = {
					is_authenticated: true,
					is_moderator: response.data["is_moderator"],
					user_id: response.data["user_id"],
					user_name: response.data["name"],
					user_email: response.data["email"]
				}

				setUser(permissions)

				return true
			}

		} catch (error) {

			return false

		}

	}



	return {
		is_authenticated,
		is_moderator,
		user_id,
		user_name,
		user_email,
		setUser,
		logOut,
		login,
		auth,
		register
	};
}