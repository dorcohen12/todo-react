import { todoService } from "../../services/todo.service.js";
import { userService } from "../../services/user.service.js";
import { ADD_TODO, REMOVE_TODO, SET_TODOS, SET_IS_LOADING, UNDO_TODOS, UPDATE_TODO, MARK_TODO_COMPLETED } from "../reducers/todo.reducer.js";
import { SET_USER_BALANCE } from "../reducers/user.reducer.js";
import { store } from "../store.js";

export function loadTodos() {
    const filterBy = store.getState().todoModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeTodo(todoId) {

    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function removeTodoOptimistic(todoId) {
    store.dispatch({ type: REMOVE_TODO, todoId })
    return todoService.remove(todoId)
        .then(() => {
            userService.addActivity(`Removed todo`)
        })
        .catch(err => {
            //store.dispatch({ type: UNDO_TODOS })
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function updateTodoCompleted(todo) {
    store.dispatch({ type: MARK_TODO_COMPLETED, todo })
    todo.isDone = true
    todo.updatedAt = Date.now()
    const loggedInUserId = userService.getLoggedinUser()._id
    return todoService.save(todo)
        .then(() => {
            userService.getById(loggedInUserId)
            .then(user => {
                userService.updateBalance(+10)
                userService.addActivity(`Completed todo - ${todo.txt}`)
                store.dispatch({type: 'SET_USER_BALANCE', balance: user.balance})
            })
        })
        .catch(err => {
            // store.dispatch({ type: UNDO_TODOS })
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then((savedTodo) => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}