
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todoDB'

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo,
    getRandomTodo,
    getDefaultFilter
}


function query(filterBy = {}) {
    if (!filterBy.txt) filterBy.txt = ''
    if(!filterBy.isDone) filterBy.isDone = 'all';
    const regExp = new RegExp(filterBy.txt, 'i')
    console.log(filterBy);
    return storageService.query(STORAGE_KEY)
        .then(todos => {
            if (filterBy.txt) {
                todos = todos.filter(todo => regExp.test(todo.txt))
            }

            if(filterBy.isDone !== 'all'){
                if(filterBy.isDone === 'active') {
                    todos = todos.filter(todo => !todo.isDone)
                } else {
                    todos = todos.filter(todo =>todo.isDone)
                }
            }
            return todos;
        })
}

function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

function remove(todoId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo)
    } else {
        return storageService.post(STORAGE_KEY, todo)
    }
}

function getEmptyTodo() {
    return {
        // _id: _makeId(),
        txt: '',
        importance: 5,
        isDone: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    };
}

function getRandomTodo() {
    return {
        txt: utilService.makeLorem(1),
        importance: Math.floor(Math.random() * 10) + 1,
        isDone: (Math.random > 0.5 ? true : false),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
}

function getDefaultFilter() {
    return { txt: '', isDone: '' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


