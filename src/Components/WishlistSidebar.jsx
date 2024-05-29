import React, { useEffect, useState } from 'react'
import { IoCloseCircleOutline, IoHeartOutline } from "react-icons/io5";
import { FaAngleRight } from 'react-icons/fa6';
import laptopImg from '../assets/Frame 29.png'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { removeItem, wishlist } from '../apis/user';
import { toast } from 'sonner';

const WishlistSidebar = ({setWishlistShow}) => {
  
const [wishlistItems,setWishlistItems] = useState([])

useEffect(()=>{
  const fetchData = async ()=>{
    const res = await wishlist()
console.log(res.data.showItems)
setWishlistItems(res.data.showItems)
  }
  fetchData()
},[wishlistItems])
  
  const wishlistRemoveHandle = async(id)=>{
const res = await removeItem(id)
console.log(res)
toast.success(res.data.message)
  }



  return (
    <div className='flex justify-end items-center w-full h-[100vh] bg-gray-700 bg-opacity-50 fixed top-0 bottom-0 left-0 right-0'>
      <div className='bg-white w- h-full'>
        <div className='bg-[#003F62] h-20 flex items-center justify-between px-10'>
          <div className='flex items-center gap-x-2'>
            <h2 className='text-lg bg-white p-2 rounded-full'><IoHeartOutline /></h2>
            <h1 className='text-white'>Items</h1>
          </div>
          <div>
            <h1 className='text-white cursor-pointer'><FaAngleRight onClick={()=>setWishlistShow(false)}/></h1>
          </div>
        </div>
        <div className='max-h-[90vh] overflow-y-scroll'>
          {wishlistItems.map((item,index)=>(
            <div className='mx-6 py-4 border-b'>
            <div className='flex items-center'>
              <div className='border rounded-xl overflow-hidden'>
                <img src={item.productId.images[0]} width={100} alt="" />
              </div>
              <div className='p-2'>
                <h3 className='font-semibold text-sm text-[#003F62] mb-2'>{item.productId.productName}</h3>
                <h3>₹{item.productId.variants[0].Price}</h3>
              </div>
              <div className='px-1'>
                <IoCloseCircleOutline className='text-xl cursor-pointer' onClick={()=>wishlistRemoveHandle(item._id)}/>
              </div>
            </div>
          </div>
          ))

          }
        </div>
      </div>
    </div>
  )
}

export default WishlistSidebar