import "./BuildingPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iBuildingsMock, requestTime} from "../../utils/consts";
import {Building} from "../../utils/types";
import mockImage from "/src/assets/mock.jpg"

const BuildingPage = ({ selectedBuilding, setSelectedBuilding }: { selectedBuilding:Building | undefined, setSelectedBuilding: Dispatch<Building| undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    if (id == undefined){
        return;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/buildings/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const service: Building = await response.json()

            setSelectedBuilding(service)

            setIsMock(false)

        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedBuilding(iBuildingsMock.find((service:Building) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/buildings/${id}/image/`

    if (selectedBuilding == undefined) {
        return (
            <div className="page-details-wrapper">

                <Link className="return-link" to="/">
                    Назад
                </Link>

            </div>
        )
    }

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{selectedBuilding?.name}</h2>

                    <br/>

                    <span>Адрес: {selectedBuilding?.description}</span>

                    <br/>

                    <span>Количество этажей: {selectedBuilding?.floors}</span>

                    <br/>

                    <span>Год начала строительства: {selectedBuilding?.year}</span>

                </div>

            </div>

        </div>
    )
}

export default BuildingPage;