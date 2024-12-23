const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link } = ReactRouterDOM

import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadTodos, updateTodoCompleted, removeTodoOptimistic, saveTodo } from '../store/actions/todo.actions.js'
import { SET_FILTER_BY } from '../store/reducers/todo.reducer.js'
import { userService } from '../services/user.service.js'

export function TodoIndex() {

    const todos = useSelector(storeState => storeState.todoModule.todos)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)

    const dispatch = useDispatch()

    useEffect(() => {
        loadTodos()
            .catch(err => console.log('err:', err))

    }, [filterBy])

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function onRemoveTodo(todoId) {
        if(!confirm('Are you sure you want to delete this todo?')) return
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

    function onMarkCompleted(todo) {
        updateTodoCompleted(todo)
            .then(() => 
                showSuccessMsg('Todo set to completed')
            )
            .catch(err => showErrorMsg('Cannot update todo'))
    }
    return (
        <div className='todo-index'>
            <h3>Todos App</h3>
            <main>
                <section>
                    <button className='add-btn'><Link to={`/todo/edit`}>Add Todo</Link></button>
                    <button onClick={onAddTodo}>Add Random Todo</button>
                </section>
                <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading
                    ? <TodoList
                        todos={todos}
                        onRemoveTodo={onRemoveTodo}
                        onMarkCompleted={onMarkCompleted}
                    />
                    : <div>Loading..</div>
                }
                {!isLoading && todos.length <= 0 ? 'No todos found...' : ''}
                <hr />
            </main>
        </div>
    )

}