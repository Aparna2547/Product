import errorHandle from "./ErrorHandle";
import Api from "./api";



export const signup = async (name, email, password) => {
  try {
    const res = await Api.post("/api/users/signup", { name, email, password });
    return res;
  } catch (error) {
    errorHandle(error);
  }
};
export const login = async (email, password) => {
  try {
    const res = await Api.post("/api/users/login", { email, password });
    return res;
  } catch (error) {
    errorHandle(error);
  }
};

export const addCategory = async (category) => {
  try {
    const res = await Api.post("/api/users/addCategory", { category });
    return res;
  } catch (error) {
    errorHandle(error);
  }
};

export const showCategory = async () => {
  try {
    const res = await Api.get("/api/users/showCategories");
    return res;
  } catch (error) {
    errorHandle(error);
  }
};

export const addSubCategory = async (selectedCategory, subCategory) => {
  try {
    const res = await Api.post("/api/users/addSubCategory", {
      selectedCategory,
      subCategory,
    });
    return res;
  } catch (error) {
    errorHandle(error);
  }
};

export const allSubCategory = async () => {
  try {
    const res = await Api.get("/api/users/showSubCategories");
    return res;
  } catch (error) {
    errorHandle(error);
  }
};

export const addProduct = async (data) => {
  try {
    const res = await Api.post("/api/users/addProduct", data);
    return res;
  } catch (error) {
    errorHandle(error);
  }
};

export const showProducts = async (categoryArray,search,currentPage) => {
  try {
    const res = await Api.get(`/api/users/allProduct?categoryArray=${categoryArray}&search=${search}&page=${currentPage}`);
    return res;
  } catch (error) {
    errorHandle(error);
  }
};

export const singleView = async (id) => {
  try {
    const res = await Api.get(`/api/users/singleProductView?id=${id}`);
    return res;
  } catch (error) {
    errorHandle(error);
  }
};

export const homeCategory = async () => {
  try {
    const res = await Api.get("/api/users/homeCategories");
    return res;
  } catch (error) {
    errorHandle(error);
  }
};

export const addToWishlist = async(id)=>{
  try {
    const res = await Api.post(`/api/users/addToWishlist?productId=${id}`)
    return res
  } catch (error) {
    errorHandle(error);
    
  }
}
export const wishlist = async()=>{
  try {
    const res = await Api.get('/api/users/displayWishlist')
    console.log('ed',res)
    return res
  } catch (error) {
    errorHandle(error);
  }
}

export const removeItem = async (id)=>{
  try {
    const res = await Api.delete(`/api/users/removefromwishlist?id=${id}` )
    return res
  } catch (error) {
    errorHandle(error)
  }
}

export const logout = async ()=>{
  try {
    const res = await Api.get('/api/users/logout')
    return res
  } catch (error) {
    errorHandle(error);
    
  }
}