export interface Building {
    id: number,
    name: string,
    status: number,
    location: string,
    floors: string,
    year: string,
    state: string,
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
}

export interface Option {
    id: number,
    name: string
}