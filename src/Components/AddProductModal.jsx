import React, { useEffect, useState } from "react";
import laptopImg from "../assets/Frame 29.png";
import uploadIcon from "../assets/uploadIcon.png";
import CropModal from "./CropModal";
import { addProduct, allSubCategory } from "../apis/user";
import { toast } from "sonner";

const AddProductModal = ({ setProductModal }) => {
  const [cropModal, setCropModal] = useState(false);

  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [variants, setVariants] = useState([{ Ram: "", Price: "", Qty: "" }]);
  const [images, setImages] = useState(["", "", ""]);
  const [selectedSubCategory,setSelectedCategory] = useState('')
  const [description, setDescription] = useState("");

  const [imageToCrop, setImageToCrop] = useState({});
  const [selectedImage, setSelectedImage] = useState({});

  useEffect(() => {
    const fetchSubCategory = async () => {
      const res = await allSubCategory();
      console.log("ae", res);
      setSubCategory(res.data);
    };
    fetchSubCategory();
  }, []);


  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(name.trim().length<2){
      toast.error('Enter product name')
      return
    }else if(variants[0].Ram == '' ||variants[0].Price=='' || variants[0].Qty=='' ){
      toast.error("Enter atleast one variant")
      return
    }else if(selectedSubCategory === ''){
      toast.error("select category")
      return
    }else if(description.length<5){
      toast.error("Enter description")
      return
    }else if(images[0]==''){
      toast.error("select atleast one image")
      return
    }
    const res = await addProduct(
      {productName:name, variants, subCategory:selectedSubCategory, description ,images} )

    console.log(res)
    if(res.data){
      toast.success(res.data.message)
      setProductModal(false)
    }
  }

  const addVariantrow = () => {
    console.log("this");
    let arr = [...variants, {}];
    console.log(arr);
    setVariants(arr);
  };

  const handleVariantChange = async (e, index) => {
    console.log(e.target.name, index);
    let arr = [...variants];
    arr[index][e.target.name] = e.target.value;
    setVariants(arr);
  };

  const handleFileInputClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleCropModal = () => {
    setCropModal(false);
    setImageToCrop(null);
    setSelectedImage(null);
  };

  const handleImageToCrop = (e) => {
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setCropModal(true);
  };

  return (
    <>
      <div className="fixed flex justify-center items-center w-full h-screen top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-40">
        <div className="bg-white w-full md:w-1/2 m-2 p-4 rounded-lg ">
          <h4 className="text-center font-semibold text-lg">Add Product </h4>
          <form className="p-8 space-y-6 max-h-[600px] overflow-y-scroll" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
              <h4 className="text-lg">Title :</h4>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="outline-none border border-gray-500 rounded-md w-3/4 p-2"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <h4 className="text-lg">Variants :</h4>
                <div className="space-y-2">
                  {variants.map((item, index) => (
                    <div className="flex flex-wrap gap-4 w-full" key={index}>
                      <div className="flex gap-2 items-center">
                        <h3>Ram:</h3>
                        <input
                          type="text"
                          name="Ram"
                          value={item.Ram}
                          onChange={(e) => handleVariantChange(e, index)}
                          className="outline-none border  border-gray-500 rounded-md p-2 w-24"
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        <h3>Price:</h3>
                        <input
                          type="text"
                          name="Price"
                          value={item.Price}
                          onChange={(e) => handleVariantChange(e, index)}
                          className="outline-none border border-gray-500 rounded-md p-2 w-24"
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        <h3>QTY:</h3>
                        <input
                          type="text"
                          name="Qty"
                          value={item.Qty}
                          onChange={(e) => handleVariantChange(e, index)}
                          className="outline-none border border-gray-500 rounded-md p-2 w-24"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <div
                  className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md cursor-pointer"
                  onClick={addVariantrow}
                >
                  Add Variants
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <h4 className="text-lg">Sub Category :</h4>
              <select
                className="outline-none border border-gray-500 rounded-md w-3/4 p-2"
                name=""
                value={selectedSubCategory}
                onChange={(e)=>setSelectedCategory(e.target.value)}
                id=""
              >
                <option value="" defaultChecked >Select subCategory</option>
                {subCategory &&
                  subCategory.map((item, index) => (
                    
                    <option value={item._id}>{item.subCategory}</option>
                  ))}
              </select>
            </div>
            <div className="flex justify-between items-center">
              <h4 className="text-lg">Description :</h4>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="outline-none border border-gray-500 rounded-md w-3/4 p-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <h4 className="text-lg">Upload Image :</h4>
              <div className="flex justify-start w-3/4 gap-4">
                {images.map((image) =>
                  image === "" ? (
                    <div className="border-2 rounded-xl overflow-hidden w-[100px] h-[100px] flex justify-center items-center">
                      <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        name="image"
                        accept="image/*"
                        onChange={(e) => handleImageToCrop(e)}
                      />
                      <img
                        src={uploadIcon}
                        width={40}
                        id="uploadImage"
                        alt=""
                        className="cursor-pointer"
                        onClick={handleFileInputClick}
                      />
                    </div>
                  ) : (
                    <div className="border-2 rounded-xl overflow-hidden">
                      <img src={image} width={100} alt="" />
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex gap-2">
                <button type="submit" className="bg-[#EDA415] text-white px-8 py-3 text-lg rounded-lg">
                  ADD
                </button>
                <div
                  className="bg-[#EEEEEE] text-black px-8 py-3 text-lg rounded-lg cursor-pointer"
                  onClick={() => setProductModal(false)}
                >
                  DISCARD
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {cropModal && (
        <CropModal
          handleCropModal={handleCropModal}
          imageToCrop={imageToCrop}
          images={images}
          setImages = {setImages}
        />
      )}
    </>
  );
};

export default AddProductModal;
