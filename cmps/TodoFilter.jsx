const { useState, useEffect, useRef } = React

import { utilService } from "../services/util.service.js"


export function TodoFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter)).current

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="todo-filter full main-layout">
            <h2>Todos Filter</h2>
            <form >
                <label htmlFor="txt">Text:</label>
                <input type="text"
                    id="txt"
                    name="txt"
                    placeholder="By Text"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="isDone">Status:</label>
                <select 
                    id="isDone"
                    name="isDone"
                    onChange={handleChange}>
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="done">Done</option>
                    </select>
            

            </form>

        </section>
    )
}