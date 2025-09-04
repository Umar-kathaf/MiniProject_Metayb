import axios from "axios";

const BikeAPI = axios.create({
  baseURL: "http://localhost:4500/api",
});

export const getBikes = (search, price) =>
  BikeAPI.get("/bikes", {
    params: { search, price },
  });
