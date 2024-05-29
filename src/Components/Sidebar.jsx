import React, { useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

const Sidebar = ({categoriesToShow,categoryArray,setCategoryArray}) => {
    const [click, setClick] = useState(false)

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
          setCategoryArray([...categoryArray, value]);
        } else {
          setCategoryArray(categoryArray.filter(filter => filter !== value));
        }
      };
      
    return (
        <div className='h-screen'>

            <div className='mt-4'>
                <h1 className='text-[#003F62] text-lg font-bold'> Categories</h1>
                <h1 className='mt-3 font-semibold'>All Categories</h1>
                <div className='mt-6'>
                    {categoriesToShow && categoriesToShow.map((item)=>(
                        <>          
                      <h1 className='flex font-semibold justify-between items-center' >{item._id[0]} {click ? <IoIosArrowDown className='mt-2 cursor-pointer' onClick={() => setClick(!click)} /> : <FaAngleRight className='mt-1.5 cursor-pointer' onClick={() => setClick(!click)} />} </h1>

                    {click && (
                        item.subCategories.map((subCategory)=>(
                            
                            <div className='px-4'>
                            
                            <div className='flex gap-3 mt-2 '>
                                <input type="checkbox" className='text-2xl' value={subCategory._id} onChange={handleCheckboxChange} checked={categoryArray.includes(subCategory._id)}/>
                                <h1 className=''>{subCategory.subCategory}</h1>
                            </div>
                        </div>
                        ))
                      
                    )
                    }
                    </>

                    ))}
                    

                </div>
            </div>
        </div>
    )
}

export default Sidebar