import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { UserContextProvider } from './Context/UserContext'
import axios from 'axios'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Layout from './Layout'

axios.defaults.baseURL = import.meta.env.VITE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Chat />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
    </UserContextProvider>
  )
}

export default App
