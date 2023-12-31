import { FaBoxOpen, FaHome, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { FaFolderPlus } from "react-icons/fa6";
import { MdOutlineReviews } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { IoStatsChart } from "react-icons/io5";
import { RiCoupon3Line } from "react-icons/ri";
// import useProducts from "../../Hooks/useProducts";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import LoadingCircle from "../../Components/LoadingCircle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Dashboard = () => {
  const { user, loading, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const axiosSecure = useAxiosSecure();
  if (loading) {
    return <LoadingCircle></LoadingCircle>;
  }
  axiosSecure.get(`/users/${user?.email}`).then((res) => {
    if (res.data.role) {
      setRole(res.data.role);
    }
  });
  console.log(role);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* dashboard side bar */}
      <div className="w-full md:w-1/4 md:min-h-screen bg-blue-300 font-semibold">
        <ul className="menu p-4 text-lg">
          {/* ------------------User routes ----------------- */}
          {(role === "subscribed" || role === "unsubscribed") && (
            <>
              <li className="">
                <NavLink to="/dashboard/userProfile">
                  <FaUser></FaUser>
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addProduct">
                  <FaFolderPlus></FaFolderPlus>
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myProduct">
                  <FaBoxOpen></FaBoxOpen>
                  My product
                </NavLink>
              </li>
            </>
          )}

          {/* ------------------Admin routes ----------------- */}
          {role === "admin" && (
            <>
              <li className="">
                <NavLink to="/dashboard/statistics">
                  <IoStatsChart />
                  Statistics
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageUsers">
                  <FaUsers />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageCoupons">
                  <RiCoupon3Line />
                  Manage Coupons
                </NavLink>
              </li>
            </>
          )}

          {/* ------------------Moderator routes ----------------- */}
          {role === "moderator" && (
            <>
              <li className="">
                <NavLink to="/dashboard/productReviewQueue">
                  <MdOutlineReviews />
                  Product Queue
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reportedContents">
                  <TbReport />
                  Reported Contents
                </NavLink>
              </li>
            </>
          )}
          {/* --------------------------Common Routes------------------------- */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">
              <FiMenu></FiMenu>
              All Products
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogOut} className="">
              <FaSignOutAlt></FaSignOutAlt>
              LogOut
            </button>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1  ml-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
