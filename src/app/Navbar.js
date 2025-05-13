'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {  UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { LogIn, LogInIcon } from 'lucide-react'
import NavbarMb from './NavbarMb'
import { ThemeToggle } from '@/components/theme-toggle'
const Navbar = () => {
   const { user, isLoaded, isSignedIn } = useUser();
    const [isSidebarOpen, setisSidebarOpen] =useState(false)
 const [isUserLogin, setisUserLogin] = useState(false);
 

   useEffect(()=>{
    if(isLoaded && isSignedIn){
       setisUserLogin(true)

    }
   
         
   },[isLoaded,isSignedIn])
   
    
    const pathname = usePathname()
const NavLists=[
    {
        name:'Home',
        link:'/'
    },
    {
        name:'About',
        link:'/about'
    }
    ,
    {
        name:'Contact',
        link:'/contact'
    },
    {
        name:'Blog',
        link:'/blog'
    }
]
  return (
   <nav className='h-12 w-full  flex justify-between px-4 items-center border-b py-10   '>
    <h1 className=' text-2xl font-bold '>
        BlogNep
    </h1>
    <div className='flex items-center gap-4'> 

      <div className=' text-xl font-semibold md:flex gap-4 hidden '>
        {NavLists.map((item)=>{
            return (
                <Link key={item.link} href={item.link}>
        <Button variant='link' className={cn(pathname==item.link?'underline':'','')} >
            {item.name}
        </Button>
    </Link>
)
})}
        {
            isUserLogin? <UserButton/>:<div className='flex items-center gap-4'> <Link href={'/sign-in'} className='flex items-center gap-2' >
                <LogIn/>
                    Sign In
                </Link>
                 </div>
        }
      </div>        
       <div className=' flex md:hidden'>
      <NavbarMb open={isSidebarOpen} onOpenChange={setisSidebarOpen} items={NavLists} pathname={pathname} isUserLogin={isUserLogin} />
       </div>
         <ThemeToggle />
      
        </div>
      
   </nav>
  )
}

export default Navbar