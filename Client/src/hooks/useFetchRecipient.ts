import axios from 'axios';
import { useState, useEffect } from 'react';


export function useFetchRecipient(chat:{}, user:any) {
    const [recipientuser, setrecipientuser] = useState({})
    const [error, seterror] = useState(null)
    const recipientId = chat?.members?.find((id) => id !== user?._id)
    
        useEffect(() => {
            const getuser = async () => {
                if (!recipientId) return null
                try {
                    const response = await axios.get(`/api/users/find/${recipientId}`)
                    setrecipientuser(response.data)
                } catch (error: any) {
                    return seterror(error)
                }
            }

            getuser()
        }, [recipientId])
    return { recipientuser }
};
