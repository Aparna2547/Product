import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import lap from "../assets/Frame 29.png"
import { FaAngleRight } from 'react-icons/fa6'
import { IoHeartOutline } from "react-icons/io5";
import WishlistSidebar from '../Components/WishlistSidebar';
import { useParams } from 'react-router';
import { singleView ,addToWishlist} from '../apis/user';
import { toast } from 'sonner';


const SinglePage = () => {
  const [wishlistShow, setWishlistShow] = useState(false)
  const [product,setProduct] = useState('')
  const [count,setCount] = useState(1)
  const {id} = useParams()
  console.log(id)

  useEffect(()=>{
    const fetchProduct = async() =>{
      const res = await singleView(id)
      console.log(res.data.product)
      setProduct(res.data.product)
    }
    fetchProduct()
  },[])

  const addToWishlisthandle =async (id)=>{
    const token = localStorage.getItem('token')
    if(!token){
      return toast.error('Please login')
    }
    const res = await addToWishlist(id)
    console.log(res)
    toast.success(res.data.message)
  }
  return (
    <>
      <Navbar setWishlistShow={setWishlistShow}/>
      <div className='px-8'>
        <div className='py-5'>
          <h1 className="flex items-center">
            <p>Home</p>
            <FaAngleRight className="" />
          </h1>
        </div>
        <div className='flex flex-col md:flex-row gap-6 mb-4'>
          <div className='md:w-1/2  flex flex-col items-center justify-center  rounded-md'>
            <div className='w-full flex justify-center p-6 border-2'>
              <img src={ product && product?.images[0]} alt="" />
            </div>
            <div className='flex w-full gap-3 items-center mt-4'>
              <div className='w-full flex justify-center p-6 border-2'>
                <img src={product && product.images[1]} width={100} alt="" />
              </div>
              <div className='w-full flex justify-center p-6 border-2'>
                <img src={product && product.images[2]} width={100} alt="" />
              </div>
            </div>
          </div>
          <div className='md:w-1/2'>
            <div className='pb-6 border-b-2'>
              <p className='text-3xl text-[#003F62] font-semibold mb-2'>{product.productName} </p>
              <p className='font-semibold text-2xl mb-4'>₹{product && product.variants[0].Price}</p>
              <div className='flex gap-2 mb-6'>
                <p>Availability :</p>
                <p className='text-[#30BD57]'>In stock</p>
              </div>
              <p className='text-[#5D5D5D] text-sm'>Hurry up! only 34 product left in stock!</p>
            </div>
            <div className='py-4'>
              <div className='flex gap-3 items-center'>
                <p>Ram :</p>
                
                <div className='flex gap-4'>
                  {product && product?.variants.map((item)=>(
                    <div className='py-[.1rem] px-2 bg-[#EEEEEE] font-semibold'>
                    <p>{item.Ram} GB</p>
                  </div>
                  ))}
                 
                </div>
              </div>
              <div className='flex gap-3 py-5 items-center'>
                <p>Quantity</p>
                <div className='flex'>
                  <div className='border-2 px-2 cursor-pointer'>
                    <p className='text-2xl' onClick={()=>setCount(count-1)}>-</p>
                  </div>
                  <div className='border-2 px-2'>
                    <p className='text-lg'>{count}</p>
                  </div>
                  <div className='border-2 px-2 cursor-pointer'>
                    <p className='text-2xl' onClick={()=>setCount(count+1)}>+</p>
                  </div>
                </div>
              </div>
              <div className='flex gap-4 items-center'>
                <div className='py-3 px-6 md:text-2xl bg-[#EDA415] text-white font-semibold rounded-3xl cursor-pointer'>
                  <p>Edit product</p>
                </div>
                <div className='py-3 px-6 md:text-2xl bg-[#EDA415] text-white font-semibold rounded-3xl cursor-pointer'>
                  <p>Buy it now</p>
                </div>
                <div className='p-4 rounded-full bg-[#EEEEEE] cursor-pointer' onClick={()=>addToWishlisthandle(product._id)}>
                  <IoHeartOutline className='text-2xl' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {wishlistShow && <WishlistSidebar setWishlistShow={setWishlistShow} />}
    </>
  )
}

export default SinglePage