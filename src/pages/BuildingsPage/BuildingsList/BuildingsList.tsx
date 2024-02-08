import "./BuildingsList.sass"
import BuildingCard from "../../../components/BuildingCard/BuildingCard";
import {useBuildings} from "../../../hooks/buildings/useBuildings";
import {useQuery} from "react-query";
import BuildingsFilters from "../BuildingsFilters/BuildingsFilters";

const BuildingsList = () => {

    const {searchBuildings} = useBuildings()

    const { isLoading, data, refetch } = useQuery(
        ["buildings"],
        () => searchBuildings(),
        {
            keepPreviousData: false,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(building  => (
        <BuildingCard building={building} key={building.id} refetch={refetch}/>
    ))

    return (
        <div className="buildings-list-wrapper">

            <BuildingsFilters refetch={refetch}/>

            <div className="buildings-list">
                { cards }
            </div>

        </div>
    )
}

export default BuildingsList;