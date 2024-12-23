import { TodoPreview } from "./TodoPreview.jsx";

export function TodoList({ todos, onRemoveTodo, onMarkCompleted }) {
    
    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li className="todo-preview" key={todo._id} style={{backgroundColor: todo.color}}>
                    <TodoPreview todo={todo} />
                    <div>
                        <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                    </div>
                    {!todo.isDone && <button onClick={() => onMarkCompleted(todo)}>Mark as Completed</button>}
                </li>
            )}
        </ul>
    )
}