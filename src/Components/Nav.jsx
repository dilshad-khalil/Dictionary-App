import React, { useState , useEffect } from 'react'
import LightIcon from '../assets/Icons/Light.png'
import DarkIcon from '../assets/Icons/Dark.png'
import { easeIn, easeInOut, easeOut, motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Link } from 'react-router-dom'

const Nav = () => {
    //toggling darkMode

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        handleLocalStorage();
        if (localStorage.theme === 'light') {
            setDarkMode(false)
        } else {
            setDarkMode(true)
        }
    }, [])

    const handleLocalStorage = () => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    const handleDarkMode = () => {
        setDarkMode(!darkMode)

        if (darkMode) {
            localStorage.theme = 'light'
            handleLocalStorage();

        }

        else if (!darkMode) {
            localStorage.theme = 'dark'
            handleLocalStorage();
        }

    }
    
  return (
      <motion.div
          initial={{
              opacity: 0,
              y: "-200px"
          }}

          animate={{ opacity: 1, y: "0px" }}
          transition={{duration:.5 , easeIn }}

          
          className='flex w-full h-[6rem]  items-center  justify-between md:px-[20%] px-6'>
          
          <div className='flex justify-between items-center w-full'>
              <Link to='/' className='font-bold italic text-xl dark:text-slate-200 text-gray-700'>Dictionary</Link>
              <div className='flex items-center gap-2'>
                  {/* <Link to='/history' className='dark:text-[#E2E8F0] text-gray-700 font-bold cursor-pointer'>History</Link> */}
                  <div className='flex gap-2 items-center justify-center ' onClick={handleDarkMode}>
                  
                  <button className={`w-[3rem] h-[1.7rem] py-2 flex items-center ${darkMode ? "justify-end" : "justify-start"} 
                   rounded-full bg-darkSecondaryColor dark:bg-purple-500`}>
                      <div className='w-[1.4rem] h-[1.4rem] ml-[.2rem] mr-[.2rem] rounded-full bg-white flex items-center justify-center'>
                          <img src={darkMode ? DarkIcon : LightIcon} className="w-4 h-4 -rotate-12" alt="" />
                      </div>
                  </button>

              </div>
              </div>
              
          </div>
    </motion.div>
  )
}

export default Nav