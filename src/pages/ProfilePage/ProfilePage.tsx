import "./ProfilePage.sass"
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import CustomButton from "../../components/CustomButton/CustomButton";
import avatar from "/src/assets/avatar.png"
import {useEffect} from "react";
import {variables} from "../../utils/consts";

const ProfilePage = () => {

	const navigate = useNavigate()

	const {is_authenticated, is_moderator, user_name, user_email, logOut} = useAuth()

	useEffect(() => {
		if (!is_authenticated) {
			navigate("/")
		}
	}, [])

	const doLogOut = async () => {

		await logOut()

		navigate("/")
	}

	return (
		<div className="profile-wrapper">

			<img src={avatar} className="user-avatar" alt=""/>

			<div className="user-info-wrapper">
				<span>Имя: {user_name}</span>
				<span>Почта: {user_email}</span>
				<span>Статус: {is_moderator ? "Модератор" : "Пользователь"}</span>

				<CustomButton bg={variables.primary} onClick={doLogOut}>Выйти</CustomButton>

			</div>

		</div>
	)
}

export default ProfilePage;