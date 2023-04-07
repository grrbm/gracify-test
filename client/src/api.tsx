import axios from "axios";

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://someproductionurl.com/api"
    : " http://localhost:4000/api";

const createInstance = (baseUrl) => {
  console.log("Setting instance: " + API_URL);
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return instance;
};

export default createInstance(API_URL);
