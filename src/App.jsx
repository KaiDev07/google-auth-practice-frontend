import { useEffect } from 'react'
import googleButton from './assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png'
import './App.css'
import { useCheckAuth } from './hooks/useCheckAuth'
import { useAuthContext } from './hooks/useAuthContext'

function navigate(url) {
    window.location.href = url
}

async function auth() {
    const response = await fetch(
        `${process.env.REACT_APP_USER_API_URL}/request`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            credentials: 'include',
        }
    )
    const data = await response.json()
    navigate(data.url)
}

function App() {
    const { user } = useAuthContext()
    const { isLoading4, checkAuth } = useCheckAuth()
    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <div className="App">
            <button onClick={() => auth()} disabled={isLoading4}>
                <img src={googleButton} alt="google sign in" />
            </button>
            {user && <h1>Welcome {!!user.name ? user.name : user.email}!</h1>}
        </div>
    )
}

export default App
