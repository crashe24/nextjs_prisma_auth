import Link from 'next/link'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const NavBar = async () => {
   
  const session =   await getServerSession(authOptions)
  console.log('session', session)
  return (
    <nav className='flex justify-center  items-center 
    bg-gray-900 text-white px-24 py-3'>
        <h1 className='text-xl font-bold p-3'>NextAuth</h1>
        <ul className='flex gap-x-2 px-3'>
            {
                !session?.user ? (
                    <>
                        <li>
                            <Link href={'/'}>Home</Link> </li>
                        <li>
                            <Link href={'/auth/login'}>Login</Link>
                        </li>
                        <li>       
                            <Link href={'/auth/register'}>Register</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href={'/dashboard'}>Register</Link>
                        </li>
                        <li>
                            <Link href={'/api/auth/signout'}>Logout</Link>
                        </li>
                    </>
                )

            }
                
        </ul>
    </nav>
  )
}

export default NavBar