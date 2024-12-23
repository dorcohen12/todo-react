import { userService } from "../../services/user.service.js";
import { CLEAR_CART, TOGGLE_CART_IS_SHOWN } from "../reducers/todo.reducer.js";
import { SET_USER, SET_USER_SCORE, UPDATE_PROFILE } from "../reducers/user.reducer.js";
import { store } from "../store.js";


export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('user actions -> Cannot login', err)
            throw err
        })
}


export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch(err => {
            console.log('user actions -> Cannot signup', err)
            throw err
        })
}


export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch((err) => {
            console.log('user actions -> Cannot logout', err)
            throw err
        })
}

export async function increaseBalance(diff = 10) {
    return userService.updateBalance(+diff)
        .then(newScore => {
            store.dispatch({ type: SET_USER_SCORE, score: newScore })
            store.dispatch({ type: CLEAR_CART })
            store.dispatch({ type: TOGGLE_CART_IS_SHOWN })
        })
        .catch((err) => {
            console.log('user actions -> Cannot update user score', err)
            throw err
        })
}

export function saveProfile(userProfile) {
   // const type = todo._id ? UPDATE_TODO : ADD_TODO
    return userService.updateUserProfile(userProfile)
        .then((userProfile) => {
            // store.dispatch({ UPDATE_PROFILE, userProfile })
            return userProfile
        })
        .catch(err => {
            console.log('user action -> Cannot save user', err)
            throw err
        })
}
