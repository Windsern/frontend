import React from "react";
import "./VerificationsTable.sass"
import {STATUSES, variables} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useVerifications} from "../../../hooks/verifications/useVerifications";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useNavigate} from "react-router-dom"
import VerificationsFilters from "../VerificationsFilters/VerificationsFilters";

const VerificationsTable = () => {

    const navigate = useNavigate()

    const {searchVerifications} = useVerifications()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Дата формирования",
            accessor: "date_formation",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        },
        {
            Header: "Дата завершения",
            accessor: "date_complete",
            Cell: ({ value }) => {
                if (!value) {
                    return "Нет"
                }

                return moment(value).locale(ru()).format("D MMMM HH:mm")
            }
        }
    ]

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["verifications"],
        () => searchVerifications(),
        {
            refetchInterval: 2000,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            keepPreviousData: false,
        }
    );

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

    const handleClick = (verification_id) => {
        navigate(`/verifications/${verification_id}`)
    }

    return (
        <div className="verifications-table-wrapper">

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={handleClick}
            >
                <VerificationsFilters refetch={refetch}/>
            </CustomTable>

        </div>
    )
}

export default VerificationsTable