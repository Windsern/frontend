import "./IndicatorsList.sass"
import SearchBar from "./SearchBar/SearchBar";
import {useEffect, useState} from "react";
import IndicatorCard from "./IndicatorCard/IndicatorCard";
import {iIndicatorsMock, requestTime} from "../../Consts";
import {Building} from "../../Types";

const IndicatorsList = () => {

    const [indicators, setIndicators] = useState<Building[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchIndicators = async () => {

        try {
            // Возможно нужно будет поставить / после слова search
            const response = await fetch(`http://127.0.0.1:8000/api/buildings/search?&title=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const rawData = await response.json()
            const indicators: Building[] = rawData["buildings"]

            setIndicators(indicators)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);
        setIndicators(iIndicatorsMock)

    }

    useEffect(() => {
        searchIndicators()
    }, [query])

    const cards = indicators.map(city  => (
        <IndicatorCard city={city} key={city.building_id} isMock={isMock}/>
    ))

    return (
        <div className="cards-list-wrapper">

            <div className="top">

                <h2>Поиск строений</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </div>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default IndicatorsList;