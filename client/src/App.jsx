import React , {useMemo , useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/profile' 
import Home from './components/home'
import Auth from './components/auth'
import './index.css'
import axios from 'axios'
import socketIO from 'socket.io-client'
import { UserContextProvider } from './userContext'
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true ; 

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          {/* Set the default route to /home/feed */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile/:id" element={<Profile />} /> 
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;