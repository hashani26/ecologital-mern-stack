import { SAVE_USER, READ_USERS } from "../types/user"

export const UserReducerInitialState = {}

export const UserReducer = (state, action) => {
    switch (action.type) {
        case SAVE_USER:
            const { user } = action.payload
            return { ...state, user }
        case READ_USERS:
            const { users } = action.payload
            return { ...state, users }
        default:
            return state
    }

}