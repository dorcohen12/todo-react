import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateBalance,
    getEmptyCredentials,
    userInfo,
    updateUserProfile,
    addActivity
}


function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            // if (user && user.password !== password) return _setLoggedinUser(user)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, balance: 10000, activities: [], color: "#000000", bgColor: "#ffffff" }
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function updateBalance(diff) {
    const loggedInUserId = getLoggedinUser()._id
    return userService.getById(loggedInUserId)
        .then(user => {
            if (user.balance + diff < 0) return Promise.reject('No credit')
            user.balance += diff
            return storageService.put(STORAGE_KEY, user)
        })
        .then(user => {
            _setLoggedinUser(user)
            return user.balance
        })
}

function userInfo() {
    const loggedInUserId = getLoggedinUser()._id
    if(loggedInUserId === null) return false;
    return userService.getById(loggedInUserId);
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance, activities: user.activities, color: user.color, bgColor: user.bgColor }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function updateUserProfile(newProfile) {
    const loggedInUserId = getLoggedinUser()._id
    return userService.getById(loggedInUserId)
        .then(user => {
            user = newProfile;
            return storageService.put(STORAGE_KEY, user)
        })
        .then(user => {
            user = newProfile;
            _setLoggedinUser(user)
            return newProfile;
        })
}

function addActivity(title) {
    const activityToInsert = {
        id: utilService.makeId(6),
        txt: title,
        timestamp: Date.now()
    }
    const loggedInUserId = getLoggedinUser()._id
    return userService.getById(loggedInUserId)
        .then(user => {
            user.activities.push(activityToInsert)
            return storageService.put(STORAGE_KEY, user)
        })
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


// // Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})



