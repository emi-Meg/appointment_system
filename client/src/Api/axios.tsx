import axios from "axios";

//I created instance for axios to avoid redundancy in data fetching.
export default axios.create({
    baseURL: "https://localhost:3000",
    withCredentials:true,
});