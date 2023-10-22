import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
export const UserContext = createContext({})

export function UserContextProvider({ children }) {

    const [profile, setProfile] = useState(null)
    const [users, setUsers] = useState([])

    const getUser = async () => {
        try {
            const response = await axios.get('/user/profile', { withCredentials: true })
            console.log(response.data.user)
            setProfile(response.data.user)
        } catch (error) {
            // alert(error.response.data.msg)
        }
    }

    const getAllUsers = async() => {
        try{
            const usersResponse = await axios.get('/user/all', {withCredentials : true}); 
            if(usersResponse?.data){
                console.log({data:usersResponse.data.users})
                setUsers(usersResponse.data.users); 
            }
        } catch(error){
            console.log({error})
        }
    }


    useEffect(() => {
        getUser()
        getAllUsers()
    }, [])

    console.log({users})

    
return ( < >
    <UserContext.Provider 
         value = {{
                profile , setProfile,
                users, setUsers, 
                }} > {children}
          </UserContext.Provider> <
    />)
}