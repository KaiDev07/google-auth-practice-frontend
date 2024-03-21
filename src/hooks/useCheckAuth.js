import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useCheckAuth = () => {
    const [isLoading4, setIsLoading4] = useState(false)
    const { dispatch } = useAuthContext()

    const checkAuth = async () => {
        try {
            setIsLoading4(true)
            const response = await fetch(
                `${process.env.REACT_APP_USER_API_URL}/refresh`,
                {
                    headers: {
                        Accept: 'application/json',
                    },
                    method: 'GET',
                    credentials: 'include',
                }
            )
            const json = await response.json()
            setIsLoading4(false)
            localStorage.setItem('token', json.accessToken)
            dispatch({
                type: 'LOGIN',
                payload: json.user,
            })
        } catch (error) {
            setIsLoading4(false)
            console.log(error.error)
        }
    }

    return { isLoading4, checkAuth }
}
