export interface iAction {
    type: string,
    payload: any
}

export interface iState {
    user: {
        isLogged: boolean
    }
}