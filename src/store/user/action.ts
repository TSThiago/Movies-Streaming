export const setLoginAction = (logged : boolean) => {
    return {
        type: "SET_LOGIN",
        payload: logged
    }
}