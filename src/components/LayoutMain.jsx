import React from 'react';
import {NavLink} from "react-router-dom";

const Layout = () => {
   return (
      <main className='flex p-12 h-full w-full justify-center items-center'>
         <div className='flex flex-col gap-4 mr-8 p-20 bg-slate-700 rounded-xl text-blue-100 justify-center'>
            <NavLink className='px-16 py-16 bg-slate-600 rounded-md text-center text-7xl' to='/test'>Тест</NavLink>
            <NavLink className='px-16 py-16 bg-slate-600 rounded-md text-center text-7xl' to='/create'>Вопросы</NavLink>
         </div>
      </main>
   )
}

export default Layout;