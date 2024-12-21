const { Link } = ReactRouterDOM

export function TodoPreview({ todo }) {

    return (
        <article>
            <h4>{todo.vendor}</h4>
            <h1>⛐</h1>
            <p>Price: <span>${todo.price.toLocaleString()}</span></p>
            {todo.owner && <p>Owner: {todo.owner.fullname}</p>}
            <hr />
            <Link to={`/todo/edit/${todo._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/todo/${todo._id}`}>Details</Link>
        </article>
    )
}
