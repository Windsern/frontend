import "./IndicatorCard.sass"
import {Building} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"

const IndicatorCard = ({ city, isMock }: {city:Building, isMock:boolean }) => {

    const img = `http://127.0.0.1:8000/api/buildings/${city.building_id}/image/`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : img}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {city.title} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/buildings/${city.building_id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default IndicatorCard;