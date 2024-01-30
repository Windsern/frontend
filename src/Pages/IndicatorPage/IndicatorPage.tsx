import "./IndicatorPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iIndicatorsMock, requestTime} from "../../Consts";
import {Building} from "../../Types";
import mockImage from "/src/assets/mock.png"

const IndicatorPage = ({ selectedIndicator, setSelectedIndicator }: { selectedIndicator:Building | undefined, setSelectedIndicator: Dispatch<Building| undefined>}) => {

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

            const city: Building = await response.json()

            setSelectedIndicator(city)

            setIsMock(false)
        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedIndicator(iIndicatorsMock.find((service:Building) => service?.building_id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/buildings/${id}/image/`

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

                    <h2 className="name">{selectedIndicator?.title}</h2>

                    <br />

                    <span className="description">{selectedIndicator?.address}</span>

                    <br />

                    <span>Тип строения: {selectedIndicator?.type_building}</span>

                    <br />

                    <span>Разрешение на строительство: {selectedIndicator?.document_building}</span>

                    <br />

                    <span>Проектные документы: {selectedIndicator?.project_document}</span>

                </div>

            </div>

        </div>
    )
}

export default IndicatorPage;