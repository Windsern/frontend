import {useEffect} from "react";
import {useVerification} from "../../hooks/verifications/useVerification";
import {useNavigate, useParams} from "react-router-dom"
import BuildingCard from "../../components/BuildingCard/BuildingCard";
import "./VerificationPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
const VerificationPage = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {verification, fetchVerification, saveVerification, sendVerification, deleteVerification, setVerification, setVerificationId} = useVerification()

    useEffect(() => {

        if (!id || !is_authenticated) {
            navigate("/")
        }

        setVerificationId(id)
        fetchVerification(id)

        return () => {
            setVerification(undefined)
        };
    }, [])

    if (verification == undefined)
    {
        return (
            <div className="verification-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendVerification = async() => {
        await saveVerification()
        await sendVerification()
        navigate("/verifications")
    }

    const onDeleteVerification = async () => {
        await deleteVerification()
        navigate("/buildings")
    }

    const cards = verification.buildings.map(building  => (
        <BuildingCard building={building} key={building.id} />
    ))


    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={onSendVerification} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteVerification} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = verification.status == 1

    const completed = [3, 4].includes(verification.status)

    return (
        <div className="verification-page-wrapper">

            <div className="verification-buildings-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новая проверка" :  "Проверка №" + verification.id}</h3>
                </div>

                <div className="verification-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == verification.status).name}</span>
                    <span>Дата создания: {moment(verification.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(verification.status) && <span>Дата формирования: {moment(verification.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(verification.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                </div>

                <div className="title">
                    <h3>Здания</h3>
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default VerificationPage