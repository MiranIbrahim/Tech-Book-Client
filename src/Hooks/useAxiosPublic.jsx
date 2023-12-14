import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://tech-book-server-iota.vercel.app",
  baseURL: "https://tech-book-server-iota.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
