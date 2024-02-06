import {useTable, usePagination} from "react-table";
import {useMemo} from "react";

export const useCustomTable = (columns, isSuccess, data) => {

    const tableColumns = useMemo(() => columns, [])

    const tableInstance = useTable({
        columns:tableColumns,
        data: isSuccess ? data : [],
        initialState: { pageSize: 25 }
    }, usePagination)

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = tableInstance

    return {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    }
}