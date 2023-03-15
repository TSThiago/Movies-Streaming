import { iUser } from "../../types/user.interface"

export const setLoginAction = (logged : boolean) => {
    return {
        type: "SET_LOGIN",
        payload: logged
    }
}

export const setLogoutAction = (logged : boolean) => {
    return {
        type: "SET_LOGOUT",
        payload: logged
    }
}

export const setUserInfosAction = (user : iUser) => {
    return {
        type: "SET_USER_INFOS",
        payload: user
    }
}

export const setRemoveUserInfosAction = (user : iUser) => {
    return {
        type: "REMOVE_USER_INFOS",
        payload: user
    }
} 