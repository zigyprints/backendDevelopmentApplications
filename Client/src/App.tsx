import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react';
import './App.css'
import { ChatContextProvider } from './Context/ChatContext';
import axios from 'axios'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Layout from './Layout'
import { UserContext } from './Context/UserContext';

axios.defaults.baseURL = import.meta.env.VITE_URL;
axios.defaults.withCredentials = true;

function App() {
  const { User } = useContext(UserContext)
  return (
    <ChatContextProvider user={User}>
      <div className='dark:bg-slate-600'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Chat />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to={'/'} />} />
          </Route>
        </Routes>
      </div>
    </ChatContextProvider>
  )
}

export default App
