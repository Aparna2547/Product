import React, { useState } from 'react'
import { toast } from 'sonner'
import { addCategory } from '../apis/user'
import { useNavigate } from 'react-router'

const AddCategoryModal = ({handleCategoryModal}) => {
  const [category,setCategory] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
 try {
  e.preventDefault()
  if(category.trim().length<2){
    toast.error("Enter category")
  }
  const res = await addCategory(category)
  if(res.data){
    toast.success(res.data.message)
    handleCategoryModal()
  }
 } catch (error) {
  toast.error('failed to add')
 }
  }
  return (
    <div className='fixed flex justify-center items-center w-full h-screen top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-40'>
      <div className='bg-white w-80 p-8 rounded-lg'>
        <h4 className='text-center mb-4 font-semibold'>Add Category</h4>
        <form onSubmit={handleSubmit}>
        <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} className='w-full outline-none border rounded-md border-gray-400 p-2' placeholder='Enter category name'/>
        <div className='flex gap-2 mt-3 justify-center'>
              <button type='submit' className='bg-[#EDA415] text-white px-6 py-2  rounded-lg'>ADD</button>
              <div className='bg-[#EEEEEE] text-black px-6 py-2  rounded-lg cursor-pointer' onClick={handleCategoryModal}>DISCARD</div>
            </div>
            </form>
      </div>
    </div>
  )
}

export default AddCategoryModal
