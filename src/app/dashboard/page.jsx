"use client"
import { signOut } from "next-auth/react"

const DashBoardPage = () => {
  return (
      <section className='h-[calc(100vh-7rem)] flex justify-center
      items-center'>
           <h1 className='text-white text-5xl'>DashBoardPage</h1> 
           <button className='bg-white text-black px-4 py-2 rounded-md mt-4'
           onClick={signOut}>Logout</button>
      </section>
    
  )
}

export default DashBoardPage