export interface Building {
    id: number,
    name: string,
    status: number,
    description: string,
    floors: string,
    year: string,
    image: string
}
export interface User {
    id: number,
    name: string,
    email: string
}

export interface Verification {
    id: number,
    status: number,
    owner: User,
    moderator: User,
    date_created: string,
    date_formation: string,
    date_complete: string,
    name: string,
}

export interface Option {
    id: number,
    name: string
}