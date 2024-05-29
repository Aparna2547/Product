import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { FaAngleRight } from "react-icons/fa6";
import lap from "../assets/Frame 29.png";
import WishlistSidebar from "../Components/WishlistSidebar";
import { IoHeartOutline } from "react-icons/io5";
import AddProductModal from "../Components/AddProductModal";
import AddCategoryModal from "../Components/AddCategoryModal";
import AddSubCategoryModal from "../Components/AddSubCategoryModal";
import CropModal from "../Components/CropModal";
import { addToWishlist, homeCategory, showProducts } from "../apis/user";
import { Link } from "react-router-dom";
import Pagination from "../Components/Pagination";
import { toast } from "sonner";

const Home = () => {
  const [wishlistShow, setWishlistShow] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [subCategoryModal, setSubCategoryModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [categoriesToShow, setCategoriesToShow] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await showProducts(categoryArray, search, currentPage);
      console.log("as", res.data);
      setProducts(res.data.all);
      setTotalPages(res.data.totalPages);
    };
    fetchProduct();
  }, [categoryArray, search, currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await homeCategory();
      console.log(response.data);
      setCategoriesToShow(response.data.data);
    };
    fetchData();
  }, []);

  const handleCategoryModal = () => {
    setCategoryModal(!categoryModal);
  };

  const handleSubCategoryModal = () => {
    setSubCategoryModal(!subCategoryModal);
  };


  const wishlist = async(id) =>{
    const res = await addToWishlist(id)
    if(res.data){
      toast.success(res.data.message)
    }

  }

  return (
    <>
      <div>
        <Navbar
          setWishlistShow={setWishlistShow}
          search={search}
          setSearch={setSearch}
        />
        <div className="px-8">
          <div className="flex justify-between py-5 pe-5">
            <h1 className="flex items-center">
              <p>Home</p>
              <FaAngleRight className="" />
            </h1>
            <div className="flex gap-4 font-bold">
              <button
                className="bg-[#EDA415] text-white px-4 py-3 rounded-2xl"
                onClick={() => setCategoryModal(true)}
              >
                Add category
              </button>
              <button
                className="bg-[#EDA415] text-white px-4 py-3 rounded-2xl"
                onClick={handleSubCategoryModal}
              >
                Add sub category
              </button>
              <button
                className="bg-[#EDA415] text-white px-4 py-3 rounded-2xl"
                onClick={() => setProductModal(!productModal)}
              >
                Add product
              </button>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/4">
              <Sidebar
                categoriesToShow={categoriesToShow}
                categoryArray={categoryArray}
                setCategoryArray={setCategoryArray}
              />
            </div>

            <div className="w-3/4 p-4">
              <div className="flex gap-8 flex-wrap">
                {products.length ? (
                  products.map((item) => (
                    <div className="border border-gray-300 rounded-3xl p-4 ">
                      <div className="flex justify-between">
                        <Link to={`/singleView/${item._id}`}>
                          <div className="px-6">
                            <img
                              src={item.images[0]}
                              width={200}
                              alt=""
                              className=""
                            />
                          </div>
                        </Link>

                        <div className="p-4">
                          <div
                            className="bg-[#B3D4E5] p-1 rounded-full cursor-pointer"
                            onClick={() => wishlist(item._id)}
                          >
                            <IoHeartOutline className="text-xl  text-black" />
                          </div>
                        </div>
                      </div>
                      <div className="px-4">
                        <h1 className="text-[#003F62] font-semibold mb-2 text-lg">
                          {item.productName}
                        </h1>
                        <h1 className="text-[#4A4A4A] font-bold text-lg">
                          ₹{item.variants[0].Price}
                        </h1>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-lg font-bold">
                    No Products Found
                  </div>
                )}
              </div>
            </div>
          </div>
          {
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          }
        </div>
      </div>
      {wishlistShow && <WishlistSidebar setWishlistShow={setWishlistShow} />}
      {productModal && <AddProductModal setProductModal={setProductModal} />}
      {categoryModal && (
        <AddCategoryModal handleCategoryModal={handleCategoryModal} />
      )}
      {subCategoryModal && (
        <AddSubCategoryModal handleSubCategoryModal={handleSubCategoryModal} />
      )}
    </>
  );
};

export default Home;
