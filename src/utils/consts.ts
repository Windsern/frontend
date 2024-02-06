import {Option} from "./Types";

export const STATUSES = [
    {
        id: 1,
        name: "Черновик"
    },
    {
        id: 2,
        name: "В работе"
    },
    {
        id: 3,
        name: "Завершен"
    },
    {
        id: 4,
        name: "Отменен"
    },
    {
        id: 5,
        name: "Удален"
    }
]

export const ADMIN_STATUSES : Option[] = [
    {
        id: -1,
        name: "Любой статус"
    },
    {
        id: 2,
        name: "В работе"
    },
    {
        id: 3,
        name: "Завершен"
    },
    {
        id: 4,
        name: "Отменен"
    }
]

export const USER_STATUSES : Option[] = [
    {
        id: -1,
        name: "Любой статус"
    },
    {
        id: 2,
        name: "В работе"
    },
    {
        id: 3,
        name: "Завершен"
    },
    {
        id: 4,
        name: "Отменен"
    }
]


export const variables = {
    primary: "#e100ff",
    green: "#568203",
    red: "#ff5252"
}