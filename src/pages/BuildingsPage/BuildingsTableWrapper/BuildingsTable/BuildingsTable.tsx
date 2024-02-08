import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {Link, useNavigate} from "react-router-dom";
import BuildingsFilters from "../../BuildingsFilters/BuildingsFilters";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import {variables} from "../../../../utils/consts";
import {useBuildings} from "../../../../hooks/buildings/useBuildings";

const BuildingsTable = ({isLoading, data, isSuccess, refetch}) => {

    const {deleteBuilding} = useBuildings()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Количество этажей",
            accessor: "floors",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Год начала строительства",
            accessor: "year",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Действие",
            accessor: "edit_button",
            Cell: ({ cell }) => (
                <Link to={`/buildings/${cell.row.values.id}/edit`}>
                    <CustomButton bg={variables.primary}>Редактировать</CustomButton>
                </Link>
            )
        },
        {
            Header: "Действие",
            accessor: "delete_button",
            Cell: ({ cell }) => (
                <CustomButton onClick={() => handleDeleteBuilding(cell.row.values.id)} bg={variables.red}>Удалить</CustomButton>
            )
        }
    ]

    const navigate = useNavigate()

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const openEditCityPage = (building_id) => {
        navigate(`/buildings/${building_id}`)
    }

    const handleDeleteBuilding = async (building_id) => {
        await deleteBuilding(building_id)
        refetch()
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditCityPage}
            >
                <BuildingsFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default BuildingsTable