import "./BuildingCard.sass"
import {Building} from "../../../utils/types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.jpg"

const BuildingCard = ({ building, isMock }: {building:Building, isMock:boolean }) => {

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : building.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title">{building.name}</h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/buildings/${building.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default BuildingCard;