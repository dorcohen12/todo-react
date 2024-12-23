import { userService } from "../../services/user.service.js"

//* Count
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'

//* User
export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'
export const UPDATE_PROFILE = 'UPDATE_PROFILE';


const initialState = {
    count: 101,
    loggedInUser: userService.getLoggedinUser(),
}


export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        //* User
        case SET_USER:
            return {
                ...state,
                loggedInUser: cmd.user
            }
        case UPDATE_PROFILE:
            const newloggedInUser = { ...state.loggedInUser }
            return { ...state, newloggedInUser }
        case SET_USER_BALANCE:
            const loggedInUser = { ...state.loggedInUser, balance: cmd.balance }
            return { ...state, loggedInUser }
        default:
            return state
    }
}
