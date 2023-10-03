import { UserContext } from '@/Context/UserContext';
import { useContext } from "react";
import Cn from '@/Uiutils/Cn';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'


export default function Navbar() {
    const { User,setUser } = useContext(UserContext)
    function LogOut() {
        localStorage.removeItem("User")
        setUser(null)
    }
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
        >
            <nav className={Cn('flex justify-between z-50 bg-opacity-60 dark:bg-opacity-30 backdrop-filter dark:backdrop-filter backdrop-blur-lg dark:backdrop-blur-lg bg-slate-300 dark:bg-slate-800')}>
                <Link to={'/'} className='flex xl:w-[25vw] my-2'>
                    <motion.div className='my-1 ml-4 w-12 h-12 rounded-full border-4 overflow-hidden transform'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                        </svg>
                    </motion.div>
                    <h1 className='text-xl sm:text-2xl lg:text-2xl font-bold text-slate-950 dark:text-white my-3'><span className='text-red-600'>Retro</span> Chat</h1>
                </Link>
                <motion.div
                    className={Cn("text-gray-500 w-fit xl:w-auto xl:relative flex rounded-full space-x-3 backdrop-filter backdrop-blur-lg bg-opacity-60 bg-gradient-to-b from-slate-300 to-slate-50 px-3  xl:mx-3 my-1 items-center font-semibold dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800")}>
                    <div className='sm:flex sm:my-1 sm:space-x-2 font-bold mx-8'>
                        <div className='bg-gray-600 text-white rounded-full  p-2 my-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {User && <span className='mt-3.5'>{User.name}</span>}
                    </div>

                </motion.div>
                {User ?
                    <div className='flex flex-row-reverse gap-4 mx-8'>
                        <div onClick={LogOut} className={Cn('group shadow-md rounded-full px-5 my-3 hover:font-bold bg-gradient-to-r from-gray-700 to-gray-500 hover:from-pink-500 hover:to-yellow-500 text-white flex justify-center items-center hover:scale-[0.9]')}>
                            LogOut
                        </div>
                    </div>
                    :
                    <div className='flex flex-row-reverse gap-4 mx-8'>
                        <Link to={'/login'} className={Cn('group shadow-md rounded-full px-5 my-3 hover:font-bold bg-gradient-to-r from-gray-700 to-gray-500 hover:from-pink-500 hover:to-yellow-500 text-white flex justify-center items-center hover:scale-[0.9]')}>
                            Login
                        </Link>
                        <Link to={'/register'}
                            className={Cn('group shadow-md rounded-full px-5 my-3 flex justify-center items-center hover:font-bold bg-gradient-to-r from-gray-700 to-gray-500 hover:from-pink-500 hover:to-yellow-500 text-white hover:scale-[0.9]')}>
                            Register
                        </Link>
                    </div>
                }
            </nav >
        </motion.div>
    )
};
