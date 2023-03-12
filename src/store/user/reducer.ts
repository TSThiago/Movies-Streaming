import { iAction } from "../../types/redux.interface"

const USER_LOGIN_INITIAL_VALUES = {
    isLogged: false
}

const userReducer = (state = USER_LOGIN_INITIAL_VALUES, action: iAction) => {
    switch (action.type) {
        case "SET_LOGIN":
            return {
                ...state,
                isLogged: state.isLogged = true
            }
        case "SET_LOGOUT":
            return {
                ...state,
                isLogged: state.isLogged = false
            }
        default:
            return state;
    }
}

export default userReducer;