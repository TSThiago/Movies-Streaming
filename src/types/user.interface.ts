export interface iUser {
    id: number,
    firstName : string,
    lastName : string,
    password: string
    email : string,
    phone : string,
    profilePic : string
}

export interface iLoginUser {
    email : string,
    password : string
}