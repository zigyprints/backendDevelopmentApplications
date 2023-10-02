import { Link } from "react-router-dom"
import { useState, useContext, FormEvent, ChangeEvent } from "react"
import axios from "axios"
import toast from 'react-hot-toast'
import {UserContext} from '../Context/UserContext';


export default function Register() {
    const {setUser} = useContext(UserContext)
    const [signupdata,setsignupdata] = useState({
        name: "",
        email: "",
        password: ""
    })

    function toggledata(event:ChangeEvent<HTMLInputElement>){
        const {name,value} = event.target
        setsignupdata(prevdata=>({
            ...prevdata,
            [name]:value
        }))
    }
    
    let errormessage:string;

    async function registerUser(event:FormEvent) {
        event.preventDefault();
        try {
            const data = await axios.post('/api/users/register',signupdata)
            setUser(data.data);
            localStorage.setItem("User",JSON.stringify(data.data))
            toast.success('Registration Successfull')
        } catch (error:any) {
            errormessage = JSON.stringify(error.response.data)
            toast.error("Registration Failed because - "+ errormessage)
        }
    }
    return (
        <div className="grow flex justify-around items-center">
        <div className="mb-36 mx-auto">
            <h1 className="font-bold text-center text-3xl sm:text-4xl my-8">Signup</h1>
            <form className="flex flex-col gap-5 justify-center w-[30rem] mx-auto" onSubmit={registerUser}>
            <input className="py-2 text-center rounded-full border-2 border-gray-400" type="text" name="name" placeholder="yourname" 
                    value={signupdata.name}
                    onChange={toggledata}/>
                    <input className="py-2 text-center rounded-full border-2 border-gray-400" type="email" name="email" placeholder="your@mail.com" 
                    value={signupdata.email}
                    onChange={toggledata}/>
                    <input className="py-2 text-center rounded-full border-2 border-gray-400" type="password" name="password" placeholder="password" 
                    value={signupdata.password}
                    onChange={toggledata}/>
                <button className="bg-slate-700 text-white font-bold rounded-full py-2" type="submit">Sign Up</button>
                <div className="text-center">Already a member? <Link className="font-bold hover:underline" to={'/login'}>Login</Link></div>
            </form>
        </div>
    </div>
    )
};
