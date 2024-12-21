import { CHANGE_BY, DECREMENT, INCREMENT } from "../store/reducers/user.reducer.js"

const { useState } = React
const { useSelector, useDispatch } = ReactRedux


export function HomePage() {
    // TODO: move to storeState
    // const [count, setCount] = useState(10)
    const count = useSelector(storeState => storeState.userModule.count)
    const dispatch = useDispatch()

    function onIncrease() {
        // setCount(count => count + 1)
        dispatch({ type: INCREMENT })
    }

    function onDecrease() {
        // setCount(count => count - 1)
        dispatch({ type: DECREMENT })
    }

    function changeBy(diff) {
        // setCount(count => count + diff)
        dispatch({ type: CHANGE_BY, diff  })
    }

    return (
        <section>
            <h2>
                Count {count}
                <button onClick={onDecrease}>-</button>
                <button onClick={onIncrease}>+</button>
                <button onClick={() => changeBy(10)}>+10</button>
            </h2 >
            <img src="assets/img/logo.png" />
        </section >
    )
}