import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveTodo } from "../store/actions/todo.actions.js"

const { useState, useEffect } = React
const { Link, useNavigate, useParams } = ReactRouterDOM


export function TodoEdit() {
    const navigate = useNavigate()
    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo(''))
    const [isLoadingTodo, setIsLoadingTodo] = useState(false)
    const { todoId } = useParams()

    useEffect(() => {
        if (todoId) loadTodo()
    }, [])

    function loadTodo() {
        setIsLoadingTodo(true)
        todoService.getById(todoId)
            .then(todo => setTodoToEdit(todo))
            .catch(err => {
                console.log('Had issues in todo edit', err)
                navigate('/todo')
            })
            .finally(() => setIsLoadingTodo(false))
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setTodoToEdit((prevTodo) => ({ ...prevTodo, [field]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        if (!todoToEdit.price) todoToEdit.price = 1000
        saveTodo(todoToEdit)
            .then(() => {
                showSuccessMsg('Todo Saved!')
                navigate('/todo')
            })
            .catch(err => {
                console.log('Had issues saving todo', err)
                showErrorMsg('Had issues saving todo')
            })
    }


    const loadingClass = isLoadingTodo ? 'loading' : ''
    const { vendor, price } = todoToEdit
    return (
        <section className={`todo-edit ${loadingClass}`}>
            <h2>{todoId ? 'Edit' : 'Add'} Todo</h2>
            <form onSubmit={onSaveTodo} >
                <label htmlFor="vendor">Vendor : </label>
                <input type="text"
                    name="vendor"
                    id="vendor"
                    placeholder="Enter vendor..."
                    value={vendor}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={price}
                    onChange={handleChange}
                />

                <div>
                    <button>{todoId ? 'Save' : 'Add'}</button>
                    <Link to="/todo">Cancel</Link>
                </div>
            </form>
        </section>
    )
}