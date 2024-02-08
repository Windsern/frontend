import "./BuildingCard.sass"
import {Building} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useVerification} from "../../hooks/verifications/useVerification";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {useBuildings} from "../../hooks/buildings/useBuildings";
import CustomInput from "../CustomInput/CustomInput";

const BuildingCard = ({ building, refetch }: {building:Building}) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {verification, is_draft, addBuildingToVerification, deleteBuildingFromVerification} = useVerification()

    const {deleteBuilding} = useBuildings()

    const handleAddBuilding = async (e) => {
        e.preventDefault()
        await addBuildingToVerification(building)
        refetch()
    }

    const handleDeleteBuildingFromVerification = async (e) => {
        e.preventDefault()
        await deleteBuildingFromVerification(building)
    }

    const handleDeleteBuilding = async (e) => {
        e.preventDefault()
        await deleteBuilding(building)
        refetch()
    }

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={building.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {building.name} </h3>

                </div>

                {location.pathname.includes("verifications") && !is_draft &&
                    <div className="card-inputs-container">
                        <CustomInput placeholder="Фактический статус готовности" value={building.state == "-1" ? "Не определен" : building.state + "%"} disabled={true}/>
                    </div>
                }

                <div className="content-bottom">

                    <Link to={`/buildings/${building.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>

                    {is_authenticated && !is_moderator && location.pathname.includes("buildings") &&
                        <CustomButton onClick={handleAddBuilding} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("verifications") &&
                        <CustomButton onClick={handleDeleteBuildingFromVerification} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default BuildingCard;