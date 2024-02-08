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
import CustomButton from "../../../components/CustomButton/CustomButton";
import {useAuth} from "../../../hooks/users/useAuth";
import {useToken} from "../../../hooks/users/useToken";
import {api} from "../../../utils/api";

const VerificationsTable = () => {

    const {access_token} = useToken()

    const {is_moderator} = useAuth()

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
        },
        {
            Header: "Зданий проверено",
            accessor: "buildings_calculated",
            Cell: ({ value }) => {
                return value
            }
        }
    ]

    if (is_moderator) {
        columns.push(
            {
                Header: "Пользователь",
                accessor: "owner",
                Cell: ({ value }) => { return value }
            },
            {
                Header: "Действие",
                accessor: "accept_button",
                Cell: ({ cell }) => (
                    is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.green} onClick={(e) => acceptVerification(cell.row.values.id)}>Принять</CustomButton>
                )
            },
            {
                Header: "Действие",
                accessor: "dismiss_button",
                Cell: ({ cell }) => (
                    is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.red} onClick={(e) => dismissVerification(cell.row.values.id)}>Отклонить</CustomButton>
                )
            }
        )
    }

    const acceptVerification = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "3")

        const response = await api.put(`verifications/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }

    const dismissVerification = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "4")

        const response = await api.put(`verifications/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }
    
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