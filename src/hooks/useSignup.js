import React from 'react'
import { useState } from 'react'
import {useAuthContext} from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (username, email, password, userType) =>{
        setIsLoading(true)
        setError(null)

        console.log(username, email, password, userType)
        const response = await fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password, userType})
        })

        const json = await response.json()
        console.log(json)

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            // save the user to local storare
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})
            setError(false)
            setIsLoading(false)
        }

    }
    return {signup, isLoading, error}
}

export default useSignup