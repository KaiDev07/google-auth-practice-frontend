import { useEffect, useState } from 'react'
import googleButton from './assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png'
import './App.css'
import { useCheckAuth } from './hooks/useCheckAuth'
import { useAuthContext } from './hooks/useAuthContext'
import axios from 'axios'

function App() {
    const { user, dispatch } = useAuthContext()
    const { isLoading4, checkAuth } = useCheckAuth()
    const [users, setUsers] = useState([])
    useEffect(() => {
        checkAuth()
    }, [])

    function auth() {
        window.open(
            `${process.env.REACT_APP_USER_API_URL}/auth/google`,
            '_self'
        )
    }

    async function logout() {
        try {
            await axios.post(
                `${process.env.REACT_APP_USER_API_URL}/logout`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            dispatch({ type: 'LOGOUT' })
        } catch (error) {
            console.log(error?.response?.data?.error)
        }
    }

    async function getUsers() {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_USER_API_URL}/getusers`,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            setUsers(response.data)
        } catch (error) {
            console.log(error.response.data.error)
        }
    }

    return (
        <div className="App">
            {user && <h1>Welcome {!!user.name ? user.name : user.email}!</h1>}
            <button onClick={auth} disabled={isLoading4}>
                <img src={googleButton} alt="google sign in" />
            </button>
            {user && (
                <div>
                    <button onClick={logout}>Log out</button>
                    <button onClick={getUsers}>Get all users</button>
                    {users &&
                        users.map((el) => <div key={el.email}>{el.name}</div>)}
                </div>
            )}
        </div>
    )
}

export default App
