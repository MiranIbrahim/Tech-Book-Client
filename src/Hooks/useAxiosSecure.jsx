import axios from "axios";
import { useContext, useEffect } from "react";


import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  // baseURL: "https://tech-book-server-iota.vercel.app",
  baseURL: "http://localhost:5000",
  
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Add a request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      // console.log("Request Interceptor - Config", config);
      const token = localStorage.getItem("access-token");
      console.log('token', token);
      if (token) {

        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  useEffect(()=>{
    axiosSecure.interceptors.response.use(
      function (response) {
        // console.log("Response Interceptor - Response", response);
        return response;
      },
       async (error) => {
        const status = error.response.status;
        console.log(status);
        if (status === 401 || status === 403) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    )
  },[logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
