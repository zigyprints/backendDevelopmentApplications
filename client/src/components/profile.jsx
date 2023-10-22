import React, { useState , useContext, useEffect } from 'react';
import {NavLink, useLocation} from 'react-router-dom'; 
import {UserContext} from '../userContext'; 
import axios from 'axios'; 
import Image from './image'
import Header from './header'
import About from './about'

const Profile = () => {
  const {posts, profile, currPost} = useContext(UserContext); 
  const [user, setUser] = useState(null); 
  const location = useLocation(); 
  const path = location.pathname; 
  const userId = path.split('/')[2]; 

  const getUserById = async() => {
    try{
      const response = await axios.get(`/user/${userId}`, {withCredentials : true}); 
      console.log({data : response?.data})
      if(response?.data){
        setUser(response.data.user); 
      }

    }catch(error){
      console.log({error})
    }
  }
  useEffect(() => {
    getUserById();
  },[profile])


  if(!user) return (
      <div className="flex justify-center items-center p-4 text-xl text-rose-600">
        <span>
          Loading...
        </span>
    </div>
)


  return (<>
    <div className="flex flex-col items-center justify-center p-4">
      <div className="px-2 py-1 min-w-[400px] w-[80%] max-w-[1280px] border border-b-0 border-gray-100 rounded-t-lg">
      	<NavLink to='/'
      		className="flex gap-4 items-center p-2">
      		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clipRule="evenodd" />
          </svg>
          Back To Chat
      	</NavLink>
        <Header user={user}/>
        <About user={user} />
        
    </div>
  </div>
 
  </>);
};

export default Profile;