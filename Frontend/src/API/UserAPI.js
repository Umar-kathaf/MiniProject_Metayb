import axios from "axios";

const userAPI = axios.create({
  baseURL: "http://localhost:4500/api",
});
const token = localStorage.getItem("token");

export const createUser = (userData) => userAPI.post("/signup", userData);
export const loginUser = (loginData) => userAPI.post("/login", loginData);
export const getUser = () => {
  return userAPI.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addBalance = (amount) => {
  return userAPI.post(
    "/addbalance",
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deductBalance = (amount) => {
  return userAPI.post(
    "/deductbalance",
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
