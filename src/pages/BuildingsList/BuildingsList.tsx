import "./BuildingsList.sass"
import SearchBar from "../../components/SearchBar/SearchBar";
import React, {useEffect, useState} from "react";
import BuildingCard from "./BuildingCard/BuildingCard";
import {iBuildingsMock, requestTime} from "../../utils/consts";
import {Building} from "../../utils/types";

const BuildingsList = () => {

    const [Buildings, setBuildings] = useState<Building[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchBuildings = async () => {

        try {

            const response = await fetch(`http://127.0.0.1:8000/api/buildings/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const raw = await response.json()
            const buildings: Building[] = raw["buildings"]

            setBuildings(buildings)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setBuildings(iBuildingsMock)

    }

    useEffect(() => {
        searchBuildings()
    }, [])

    const cards = Buildings.map(building  => (
        <BuildingCard building={building} key={building.id} isMock={isMock}/>
    ))

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        searchBuildings()
    }

    return (
        <div className="cards-list-wrapper">

            <form className="top" onSubmit={(e) => handleSubmit(e)}>

                <h2>Поиск корпусов</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </form>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default BuildingsList;