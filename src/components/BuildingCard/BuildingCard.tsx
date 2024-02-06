import "./BuildingCard.sass"
import {Building} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useVerification} from "../../hooks/verifications/useVerification";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";

const BuildingCard = ({ building, refetch }: {building:Building}) => {
    
    const {is_authenticated, is_moderator} = useAuth()

    const {is_draft, addBuildingToVerification, deleteBuildingFromVerification} = useVerification()

    const handleAddBuilding = async (e) => {
        e.preventDefault()
        await addBuildingToVerification(building)
        refetch()
    }

    const handleDeleteBuildingFromVerification = async (e) => {
        e.preventDefault()
        await deleteBuildingFromVerification(building)
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