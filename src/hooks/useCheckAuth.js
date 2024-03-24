import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useCheckAuth = () => {
    const [isLoading4, setIsLoading4] = useState(false)
    const { dispatch } = useAuthContext()

    const checkAuth = async () => {
        try {
            setIsLoading4(true)
            const response = await axios(
                `${process.env.REACT_APP_USER_API_URL}/refresh`,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            setIsLoading4(false)
            console.log(response.data.user)
            localStorage.setItem('token', response.data.accessToken)
            dispatch({
                type: 'LOGIN',
                payload: response.data.user,
            })
        } catch (error) {
            setIsLoading4(false)
            console.log(error.response.data.error)
        }
    }

    return { isLoading4, checkAuth }
}
