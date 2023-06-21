import React from 'react';
import {NavLink, Outlet} from "react-router-dom";

const Layout = () => {
   return (
      <>
         <header className='mx-auto mt-8 w-fit'>
            <NavLink className='px-4 py-2' style={({isActive}) => isActive ? {textDecoration: 'underline'} : {}} to='/create'>Вопросы</NavLink>
            <NavLink className='px-4 py-2' style={({isActive}) => isActive ? {textDecoration: 'underline'} : {}} to='/test'>Тест</NavLink>
            <NavLink className='px-4 py-2' style={({isActive}) => isActive ? {textDecoration: 'underline'} : {}} to='/constructor'>Конструктор отчётов</NavLink>
         </header>
         <main className='p-4 h-full w-full md:w-3/4 md:p-12 mx-auto flex flex-col gap-4'>
            <Outlet/>
         </main>
      </>
   )
}

export default Layout;