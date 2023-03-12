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