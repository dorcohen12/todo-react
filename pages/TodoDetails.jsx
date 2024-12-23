import { todoService } from "../services/todo.service.js"

const { useEffect, useState } = React
const { Link, useParams, useNavigate } = ReactRouterDOM


export function TodoDetails() {
    const [todo, setTodo] = useState(null)
    const { todoId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (todoId) loadTodo()
    }, [todoId])

    function loadTodo() {
        todoService.getById(todoId)
            .then(todo => setTodo(todo))
            .catch(err => {
                console.log('Had issues in todo details', err)
                navigate('/todo')
            })
    }
    if (!todo) return <div>Loading...</div>
    return (
        <section className="todo-details">
            <h1>Todo title : {todo.title}</h1>
            <h5>Importance: ${todo.importance}</h5>
            <h6>Status: {todo.isDone ? 'Completed' : 'Pending'}</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Link to={`/todo/edit/${todo._id}`}>Edit</Link> &nbsp;
            <Link to={`/todo`}>Back</Link>
        </section>
    )
}