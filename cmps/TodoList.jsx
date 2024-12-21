import { TodoPreview } from "./TodoPreview.jsx";

export function TodoList({ todos, onRemoveTodo, onEditTodo, addToTodot }) {

    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li className="todo-preview" key={todo._id}>
                    <TodoPreview todo={todo} />
                    <div>
                        <button onClick={() => onRemoveTodo(todo._id)}>x</button>
                        <button onClick={() => onEditTodo(todo)}>Edit Prompt</button>
                    </div>
                    <button className="buy" onClick={() => addToTodot(todo)}>Add to Todot</button>
                </li>
            )}
        </ul>
    )
}