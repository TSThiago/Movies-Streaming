import { iUser } from "./user.interface"

export interface iAction {
    type: string,
    payload: any
}

export interface iState {
    user: {
        isLogged: false,
        user: iUser
    }
}