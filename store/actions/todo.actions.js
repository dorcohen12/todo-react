import { todoService } from "../../services/todo.service.js";
import { ADD_CAR, REMOVE_CAR, SET_CARS, SET_IS_LOADING, UNDO_CARS, UPDATE_CAR } from "../reducers/todo.reducer.js";
import { store } from "../store.js";

export function loadTodos() {
    const filterBy = store.getState().todoModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_CARS, todos })
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
            store.dispatch({ type: REMOVE_CAR, todoId })
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function removeTodoOptimistic(todoId) {
    store.dispatch({ type: REMOVE_CAR, todoId })
    return todoService.remove(todoId)
        .catch(err => {
            store.dispatch({ type: UNDO_CARS })
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_CAR : ADD_CAR
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