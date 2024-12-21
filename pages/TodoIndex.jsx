const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link } = ReactRouterDOM

import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadTodos, removeTodo, removeTodoOptimistic, saveTodo } from '../store/actions/todo.actions.js'
import { ADD_CAR_TO_CART, SET_FILTER_BY } from '../store/reducers/todo.reducer.js'

export function TodoIndex() {

    // TODO: move to storeState
    // const [todos, setTodos] = useState(null)
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    // const [todot, setTodot] = useState([])
    // const [filterBy, setFilterBy] = useState(todoService.getDefaultFilter())
    const dispatch = useDispatch()



    useEffect(() => {
        loadTodos()
            .catch(err => console.log('err:', err))

    }, [filterBy])

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function onRemoveTodo(todoId) {
        removeTodoOptimistic(todoId)
            .then(() => showSuccessMsg('Todo removed'))
            .catch(err => showErrorMsg('Cannot remove todo'))
    }

    function onAddTodo() {
        const todoToSave = todoService.getRandomTodo()

        // TODO: move to a function and use dispatch/action
        saveTodo(todoToSave)
            .then(() => {
                showSuccessMsg(`Todo added`)
            })
            .catch(() => {
                showErrorMsg('Cannot add todo')
            })
    }

    function onEditTodo(todo) {
        const price = +prompt('New price?', todo.price)
        const todoToSave = { ...todo, price }

        // TODO: move to a function and use dispatch/action
        saveTodo(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo updated to price: $${savedTodo.price}`)
            })
            .catch(() => {
                showErrorMsg('Cannot update todo')
            })
    }

    function addToTodot(todo) {
        console.log(`Adding ${todo.vendor} to Todot`)
        // TODO: use dispatch/action
        // setTodot(todot => [...todot, todo])
        dispatch({ type: ADD_CAR_TO_CART, todo })
        showSuccessMsg(`Added ${todo.vendor} to Todot`)
    }

    return (
        <div className='todo-index'>
            <h3>Todos App</h3>
            <main>
                <section>
                    <button className='add-btn'><Link to={`/todo/edit`}>Add Todo</Link></button>
                    <button onClick={onAddTodo}>Add Random Todo ⛐</button>
                </section>
                <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading
                    ? <TodoList
                        todos={todos}
                        onRemoveTodo={onRemoveTodo}
                        onEditTodo={onEditTodo}
                        addToTodot={addToTodot}
                    />
                    : <div>Loading..</div>
                }
                <hr />
            </main>
        </div>
    )

}