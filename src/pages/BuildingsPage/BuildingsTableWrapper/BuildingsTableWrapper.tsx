import {useBuildings} from "../../../hooks/buildings/useBuildings";
import {useQuery} from "react-query";
import BuildingsTable from "./BuildingsTable/BuildingsTable";

const BuildingsTableWrapper = () => {

    const {searchBuildings} = useBuildings()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["buildings"],
        () => searchBuildings(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            <BuildingsTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default BuildingsTableWrapper