import axios from "axios";

const cartAPI = axios.create({
  baseURL: "http://localhost:4500/api",
});

cartAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const addtoCartAPI = (cartData) => cartAPI.post("/addcart", cartData);
export const getCartAPI = (userId) => cartAPI.get(`/getcart?userId=${userId}`);
export const updateQuantityAPI = (cartId, quantity) =>
  cartAPI.put("/updatequant", { cartId, quantity });
export const removeCartAPI = (cartId) => cartAPI.delete(`/deletecart/${cartId}`);
