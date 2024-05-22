import React, { useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

const Sidebar = () => {
    const [click,setClick] = useState(false)
  return (
    <div className='m-2 p-8 h-screen'>

        <div className='mt-10'>
            <h1 className='text-[#003F62] text-xl font-bold'> Categories</h1>
            <h1 className='mt-3 text-lg'>All Categories</h1>
            <div className='mt-6'>
                <h1 className='flex text-xl justify-between' >Laptops {click ? <IoIosArrowDown className='mt-2 cursor-pointer' onClick={()=>setClick(!click)} />: <FaAngleRight className='mt-1.5 cursor-pointer' onClick={()=>setClick(!click)}/>} </h1>
                {click && (
                    <div className='flex gap-3 mt-5'>
                    <input type="checkbox"  className='text-2xl'/> 
                    <h1 className='text-lg'>Dell</h1>
                    </div>
                )
                }
                
            </div>
        </div>
    </div>
  )
}

export default Sidebar