import React, {useState, useEffect, useContext} from 'react' 
import {NavLink, useNavigate} from 'react-router-dom'
import {UserContext} from '../userContext'
import Messages from './messages'

const Home = () => {
	const navigate = useNavigate(); 
	const {profile, setProfile} = useContext(UserContext); 
	console.log({profile})

	if(!profile) return (<> 
		<div className="flex justify-center h-screen items-center bg-slate-200">
			<div className="p-24 border border-gray-200 bg-slate-100 rounded-lg">
				<NavLink to='/auth'
					className="border border-gray-200 rounded-lg p-3 hover:bg-slate-400 hover:text-black"> 
					Login to Start conversation
				</NavLink>
			</div>
		</div>
	</>)

	return (<> 
		<div className="h-screen">
			<Messages />
		</div>
	</>)
}

export default Home; 