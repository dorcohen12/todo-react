import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { userService } from "../services/user.service.js"
import { saveProfile } from "../store/actions/user.actions.js"

const { useState, useEffect } = React
const { Link, useNavigate, useParams } = ReactRouterDOM

export function UserDetails() {

    const navigate = useNavigate()
    const [isLoadingProfile, setIsLoadingProfile] = useState(false)
    var [profileToEdit, setProfileToEdit] = useState(userService.userInfo || false)

    useEffect(() => {
        if(profileToEdit) loadProfile()
    }, [])

    function loadProfile() {
        userService.userInfo()
            .then(profileToEdit => setProfileToEdit(profileToEdit))
            .catch(err => {
                navigate('/home')
            })
            .finally(() => setIsLoadingProfile(false))
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setProfileToEdit((prevTodo) => ({ ...prevTodo, [field]: value }))
    }

    function onSaveProfile(ev) {
        ev.preventDefault()
        //if (!todoToEdit.importance) todoToEdit.importance = 10
        saveProfile(profileToEdit)
            .then(() => {
                showSuccessMsg('Profile Saved!')
                navigate('/userdetails')
            })
            .catch(err => {
                console.log('Had issues saving profile', err)
                showErrorMsg('Had issues saving profile')
            })
    }

    const {fullname, color, bgColor } = profileToEdit

    if(isLoadingProfile) return 'Loading...'

    return (
        <section className={`user-details`} style={{backgroundColor: bgColor, color: color}}>
            <form onSubmit={onSaveProfile} >
                <label htmlFor="fullname">Full Name : </label>
                <input type="text"
                    name="fullname"
                    id="fullname"
                    placeholder="Enter full name..."
                    value={fullname}
                    onChange={handleChange} required
                />

                <label htmlFor="color">Color: </label>
                <input type="color"
                    name="color"
                    id="color"
                    placeholder="Enter color"
                    value={color}
                    onChange={handleChange} required
                />

                <label htmlFor="bgColor">BG Color: </label>
                <input type="color"
                    name="bgColor"
                    id="bgColor"
                    placeholder="Enter bgColor"
                    value={bgColor}
                    onChange={handleChange} required
                />

                <div>
                    <button>Save</button>
                    <Link to="/">Cancel</Link>
                </div>
            </form>

            <hr/>

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Info</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        profileToEdit.activities && profileToEdit.activities.map(activity => {
                            const timeAgo = moment(activity.timestamp).fromNow()
                            return <tr key={activity.id}>
                                <td>{activity.id}</td>
                                <td>{activity.txt}</td>
                                <td>{timeAgo}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </section>
    )
}