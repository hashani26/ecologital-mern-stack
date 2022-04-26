import { SAVE_USER } from "../types/user"
import { READ_USERS } from "../types/user"

export const saveUser = (user) => {
    return {
        type: SAVE_USER,
        payload: { user }
    }
}

export const readUsers = (users) => {
    return {
        type: READ_USERS,
        payload: { users }
    }
}