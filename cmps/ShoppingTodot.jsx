const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { checkout } from '../store/actions/user.actions.js'
import { REMOVE_CAR_FROM_CART } from '../store/reducers/todo.reducer.js'

export function ShoppingTodot({ isTodotShown }) {

    // TODO: get from storeState
    const shoppingTodot = useSelector(storeState => storeState.todoModule.shoppingTodot)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const dispatch = useDispatch()
    // const shoppingTodot = []

    // const user = userService.getLoggedinUser()

    function removeFromTodot(todoId) {
        console.log(`Todo: remove: ${todoId} from todot`)
        dispatch({ type: REMOVE_CAR_FROM_CART, todoId })
    }

    function getTodotTotal() {
        return shoppingTodot.reduce((acc, todo) => acc + todo.price, 0)
    }

    function onCheckout() {
        const amount = getTodotTotal()
        checkout(amount)
            .then(() => {
                showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
            })
            .catch(() => {
                showErrorMsg('There was a problem checking out!')
            })
    }

    if (!isTodotShown) return <span></span>
    const total = getTodotTotal()
    return (
        <section className="todot" >
            <h5>Your Todot</h5>
            <ul>
                {
                    shoppingTodot.map((todo, idx) => <li key={idx}>
                        <button onClick={() => {
                            removeFromTodot(todo._id)
                        }}>x</button>
                        {todo.vendor} | ${todo.price}
                    </li>)
                }
            </ul>
            <p>Total: ${total} </p>
            <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
        </section>
    )
}
