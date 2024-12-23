const { Link } = ReactRouterDOM

export function TodoPreview({ todo }) {

    return (
        <article>
            <h4>{todo.txt}</h4>
            <h1>{todo.isDone ? 'Completed' : 'Pending'}</h1>
            <h5>Level {todo.importance}</h5>
            <hr />
            <Link to={`/todo/edit/${todo._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/todo/${todo._id}`}>Details</Link>
        </article>
    )
}
