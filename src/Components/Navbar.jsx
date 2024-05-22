import React from 'react'
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";


const Navbar = () => {
  return (
    <>
       <div className='flex bg-[#003F62] h-[10vh] p-2 justify-between'>
        <div></div>
        <div>
            <form className=' rounded-full bg-white flex my-2 px-5 '>
                <input type="text" placeholder=' Search any things'  className='outline-none bg-white ms-2'/>
                <button className='bg-[#EDA415] me-0 px-3 py-2 text-white'>search</button>
            </form>
        </div>
        <div className='mt-4 flex gap-3 me-10'>
        <IoHeartOutline className='text-white text-xl mt-1'/>
        <p className='text-white'>Sign in</p>
        <div className='flex'>
        <MdOutlineShoppingCart className='text-white text-xl mt-1'/>
        <p className='text-white'>Cart</p>

        </div>
        </div>
        </div> 
    </>
  )
}

export default Navbar