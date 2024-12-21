import { todoService } from "../../services/todo.service.js"


export const SET_CARS = 'SET_CARS'
export const REMOVE_CAR = 'REMOVE_CAR'
export const ADD_CAR = 'ADD_CAR'
export const UPDATE_CAR = 'UPDATE_CAR'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const UNDO_CARS = 'UNDO_CARS'

//* Todot
export const TOGGLE_CART_IS_SHOWN = 'TOGGLE_CART_IS_SHOWN'
export const ADD_CAR_TO_CART = 'ADD_CAR_TO_CART'
export const REMOVE_CAR_FROM_CART = 'REMOVE_CAR_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'


const initialState = {
    todos: [],
    filterBy: todoService.getDefaultFilter(),
    isLoading: false,
    shoppingTodot: [],
    isTodotShown: false,
    lastTodos: []
}


export function todoReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_CARS:
            return {
                ...state,
                todos: cmd.todos
            }
        case ADD_CAR:
            return {
                ...state,
                todos: [...state.todos, cmd.todo]
            }
        case REMOVE_CAR:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId),
                lastTodos: [...state.todos]
            }
        case UPDATE_CAR:
            return {
                ...state,
                todos: state.todos.map(todo => todo._id === cmd.todo._id ? cmd.todo : todo)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        case UNDO_CARS:
            return {
                ...state,
                todos: [...state.lastTodos],
            }

        //* Shopping todot
        case TOGGLE_CART_IS_SHOWN:
            return { ...state, isTodotShown: !state.isTodotShown }

        case ADD_CAR_TO_CART:
            return {
                ...state,
                shoppingTodot: [...state.shoppingTodot, cmd.todo]
            }

        case REMOVE_CAR_FROM_CART:
            const shoppingTodot = state.shoppingTodot.filter(todo => todo._id !== cmd.todoId)
            return { ...state, shoppingTodot }

        case CLEAR_CART:
            return { ...state, shoppingTodot: [] }
        default:
            return state
    }
}
