import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function SideBar() {
  const router = useRouter();

  return (
    <div className='min-h-screen bg-blue-500 pt-12'>
        <aside className="flex justify-center">
          <ul className='flex flex-col gap-7 items-center'>
            <li></li>
            <li></li>
            <li className='w-full'>
              <Link 
                href="/home"
                className={`block text-center py-2 text-white 
                  ${router.pathname === '/home' ? 'bg-blue-700' : 'hover:bg-blue-600'} 
                  transition rounded-md`}
              >
                Home
              </Link>
            </li>
            <li className='w-full'>
              <Link 
                href="/media/movies"
                className={`block text-center py-2 text-white 
                  ${router.pathname === '/media/movies' ? 'bg-blue-700' : 'hover:bg-blue-600'} 
                  transition rounded-md`}
              >
                Movies
              </Link>
            </li>
            <li className='w-full'>
              <Link 
                href="/media/shows"
                className={`block text-center py-2 text-white 
                  ${router.pathname === '/media/shows' ? 'bg-blue-700' : 'hover:bg-blue-600'} 
                  transition rounded-md`}
              >
                Shows
              </Link>
            </li>
            <li className='w-full'>
              <Link 
                href="/user/tickets"
                className={`block text-center py-2 text-white 
                  ${router.pathname === '/user/tickets' ? 'bg-blue-700' : 'hover:bg-blue-600'} 
                  transition rounded-md`}
              >
                Booked Tickets
              </Link>
            </li>
            <li className='w-full'>
              <Link 
                href="/user/profile"
                className={`block text-center py-2 text-white 
                  ${router.pathname === '/user/profile' ? 'bg-blue-700' : 'hover:bg-blue-600'} 
                  transition rounded-md`}
              >
                Profile
              </Link>
            </li>
          </ul>
        </aside>
    </div>
  )
}

export default SideBar
