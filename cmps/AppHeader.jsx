import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/todo.reducer.js'

const { Link, NavLink } = ReactRouterDOM
const { useState } = React
const { useSelector, useDispatch } = ReactRedux
const { useNavigate } = ReactRouter

export function AppHeader() {

    const dispatch = useDispatch()

    // const [user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const todotLength = useSelector(storeState => storeState.todoModule.shoppingTodot.length)

    function onLogout() {
        logout()
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    // function onSetUser(user) {
    //     // TODO: use dispatch
    //     setUser(user)
    //     navigate('/')
    // }

    function onToggleTodot(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    {user ? <NavLink to="/todo" >Todos</NavLink> : ''}
                    {user ? (<NavLink to="/userdetails" >My Profile</NavLink>) : ''}
                </nav>
            </section>
            {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname} <span>${user.balance.toLocaleString()}</span></span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
        </header>
    )
}
