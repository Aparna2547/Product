import React from 'react'
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { logout } from '../apis/user';
import { toast } from 'sonner';


const Navbar = ({setWishlistShow,setSearch,search}) => {
  const token = localStorage.getItem('token')
  const userLogout = async ()=>{
    const res = await logout()
    toast.success('logged out')
    localStorage.removeItem('token')
  }
  return (
    <>
      <div className='flex bg-[#003F62] h-20 p-2 justify-between items-center'>
        <div className='flex justify-end w-1/2'>
          <form className='rounded-xl bg-white flex my-2 overflow-hidden'>
            <input type="text" placeholder='Search any things' className='outline-none bg-white ms-2' onChange={(e)=>setSearch(e.target.value)} />
            <button className='bg-[#EDA415] me-0 px-3 py-2 text-white'>search</button>
          </form>
        </div>
        <div className='flex gap-4 me-10 items-center'>
        
            <IoHeartOutline className='text-white text-xl mt-1 cursor-pointer' onClick={()=>setWishlistShow(true)}/>
            {token ? 
             <p className='text-white cursor-pointer' onClick={userLogout}>logout</p>
             :
             <Link to={'/login'}>
             <p className='text-white cursor-pointer'>Sign in</p>
           </Link>
            }
        
          <Link>
          <div className='flex cursor-pointer'>
            <MdOutlineShoppingCart className='text-white text-xl mt-1' />
            <p className='text-white'>Cart</p>
          </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar