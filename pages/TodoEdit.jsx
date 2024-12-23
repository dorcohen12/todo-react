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
        if (!todoToEdit.importance) todoToEdit.importance = 10
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
    const { txt, importance, color } = todoToEdit
    return (
        <section className={`todo-edit ${loadingClass}`}>
            <h2>{todoId ? 'Edit' : 'Add'} Todo</h2>
            <form onSubmit={onSaveTodo} >
                <label htmlFor="txt">Text : </label>
                <input type="text"
                    name="txt"
                    id="txt"
                    placeholder="Enter title..."
                    value={txt}
                    onChange={handleChange} required
                />

                <label htmlFor="importance">Importance : </label>
                <input type="number" min="1" max="10"
                    name="importance"
                    id="importance"
                    placeholder="Enter importance"
                    value={importance}
                    onChange={handleChange} required
                />

                <label htmlFor="importance">Color: </label>
                <input type="color"
                    name="color"
                    id="color"
                    placeholder="Enter color"
                    value={color}
                    onChange={handleChange} required
                />

                <div>
                    <button>{todoId ? 'Save' : 'Add'}</button>
                    <Link to="/todo">Cancel</Link>
                </div>
            </form>
        </section>
    )
}