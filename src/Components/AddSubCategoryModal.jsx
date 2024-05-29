import React, { useEffect, useState } from "react";
import { addSubCategory, showCategory } from "../apis/user";
import { toast } from "sonner";

const AddSubCategoryModal = ({ handleSubCategoryModal }) => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [selectedCategory,setSelectedCategory] = useState('')
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await showCategory();
        console.log("dahs", res.data);
        setCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(subCategory)
    if(selectedCategory=== ''){
      toast.error('Select category')
      return
    }
    else if (subCategory.trim().length < 2) {
      toast.error("invalid");
      return;
    }
    const res = await addSubCategory(selectedCategory, subCategory);
    console.log("sd", res);
    if(res.data){
      toast.success(res.data.message)
      handleSubCategoryModal()
    }
  };
  return (
    <div className="fixed flex justify-center items-center w-full h-screen top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-40">
      <div className="bg-white w-80 p-8 rounded-lg">
        <form onSubmit={handleSubmit}>
          <h4 className="text-center mb-4 font-semibold">Add Sub Category</h4>
          <select
            name=""
            id=""
            className="w-full outline-none border rounded-md border-gray-400 p-2 mb-3"
            value={selectedCategory}
            onChange={(e)=>setSelectedCategory(e.target.value)}
          >
            <option value="" disabled selected>
              Select Category
            </option>
            {category &&
              category.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.category}
                </option>
              ))}
          </select>

          <input
            type="text"
            name=""
            id=""
            className="w-full outline-none border rounded-md border-gray-400 p-2"
            placeholder="Enter sub category name"
            value={subCategory}
            onChange={(e)=>setSubCategory(e.target.value)}
          />
          <div className="flex gap-2 mt-3 justify-center">
            <button
              type="submit"
              className="bg-[#EDA415] text-white px-6 py-2  rounded-lg"
            >
              ADD
            </button>
            <div
              className="bg-[#EEEEEE] text-black px-6 py-2  rounded-lg cursor-pointer"
              onClick={handleSubCategoryModal}
            >
              DISCARD
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategoryModal;
