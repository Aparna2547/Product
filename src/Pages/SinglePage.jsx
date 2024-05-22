import React from 'react'
import Navbar from '../Components/Navbar'
import lap from "../assets/bg.png"

const SinglePage = () => {
  return (
    <>
    <Navbar/>
    <h1>home</h1>

    <div className='flex'>
    <div className='w-1/3 mx-4'>
        <div className='border border-gray-300 rounded-lg'>
          <div className='h-64 p-3'>
            <img src={lap} alt="photo" className='object-contain h-full w-full' />
            </div>
        </div>
    </div>
    <div className='w-2/3 mx-4'>
        <div className='border border-gray-300 rounded-lg flex justify-center items-center'>
            <img src={lap} alt="photo" className='h-96' />
        </div>
    </div>
    </div>
    </>
  )
}

export default SinglePage