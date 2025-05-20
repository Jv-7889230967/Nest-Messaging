import { User } from "./users.model"

export interface userType {
    user_id?: number
    name?: string,
    email: string,
    password: string,
    refresh_token?: string,
}

export type logginedUserType = {
    name?: string,
    email?: string,
    access_token: string
}