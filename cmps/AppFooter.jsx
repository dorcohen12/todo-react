const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { UserMsg } from './UserMsg.jsx'
import { ShoppingTodot } from './ShoppingTodot.jsx'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/todo.reducer.js'


export function AppFooter() {
    const dispatch = useDispatch()
    // const [isTodotShown, setIsTodotShown] = useState(false)
    const isTodotShown = useSelector(storeState => storeState.todoModule.isTodotShown)
    const count = useSelector(storeState => storeState.userModule.count)
    const todosLength = useSelector(storeState => storeState.todoModule.todos.length)

    function onToggleTodot(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
        // setIsTodotShown(isTodotShown => !isTodotShown)
    }

    // TODO: move to storeState
    // const count = 101
    // const todosCount = 0
    const todot = []


    return (
        <footer>
            <h5>
                Currently {todosLength} todos in the shop
            </h5>
            <p>
                Coffeerights to all - Count: {count}
            </p>
            <h5>
                <span>{todot.length}</span> Products in your Todot
                <a href="#" onClick={onToggleTodot}>
                    ({(isTodotShown) ? 'hide' : 'show'})
                </a>
            </h5>
            <ShoppingTodot isTodotShown={isTodotShown} />
            <UserMsg />
        </footer>
    )
}
